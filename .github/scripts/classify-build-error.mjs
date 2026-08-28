import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const log = readFileSync(process.argv[2], "utf8");
const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
const match = log.match(/Cannot find (?:module|package)\s+['"]([^'"]+)['"]/i);

if (!match) {
  console.log("::error title=Production build failed::Category: unclassified missing import");
  process.exit(0);
}

const specifier = match[1];
const packageName = specifier.startsWith("@")
  ? specifier.split("/").slice(0, 2).join("/")
  : specifier.split("/")[0];

const allowedPackages = [...new Set(
  Object.keys(lock.packages)
    .filter((key) => key.includes("node_modules/"))
    .map((key) => key.slice(key.lastIndexOf("node_modules/") + 13))
    .map((key) => key.startsWith("@") ? key.split("/").slice(0, 2).join("/") : key.split("/")[0]),
)].sort();
const index = allowedPackages.indexOf(packageName);

if (index >= 0) {
  console.log(`::error title=Production build failed::Category: dependency lock index ${index}`);
} else if (specifier.startsWith("./") || specifier.startsWith("../")) {
  console.log("::error title=Production build failed::Category: relative source import");
} else if (specifier.startsWith("/") || specifier.startsWith("file:")) {
  const normalized = decodeURIComponent(specifier).replaceAll("\\", "/");
  const category = normalized.includes("/node_modules/")
    ? "dependency filesystem import"
    : normalized.includes(".tanstack")
      ? "generated TanStack filesystem import"
      : normalized.includes("/src/") || normalized.includes("/src%2F")
        ? "source filesystem import"
        : normalized.includes(".output")
          ? "build output filesystem import"
          : normalized.includes("/home/runner/work/") || normalized.includes("/runner/_work/")
            ? (() => {
                const workspace = process.cwd().replaceAll("\\", "/");
                const relative = normalized.replace(/^file:\/\//, "").split(/[?#]/)[0].slice(workspace.length + 1);
                const tracked = execFileSync("git", ["ls-files"], { encoding: "utf8" })
                  .trim().split(/\r?\n/).sort();
                const trackedIndex = tracked.indexOf(relative);
                if (trackedIndex >= 0) return `tracked repository file index ${trackedIndex}`;
                const depth = relative.split("/").length;
                const extension = relative.includes(".") ? relative.split(".").at(-1) : "none";
                const topLevel = relative.split("/")[0];
                const knownBuildRoots = new Set(["dist", "build", "public", "server", "client", "assets", ".vite", ".nitro"]);
                if (knownBuildRoots.has(topLevel)) return `untracked ${topLevel} build path depth ${depth} extension ${extension}`;
                return `untracked repository path depth ${depth} extension ${extension}`;
              })()
            : normalized.includes("/runner/_temp/") || normalized.includes("/tmp/")
              ? "temporary filesystem import"
          : "other absolute filesystem import";
  console.log(`::error title=Production build failed::Category: ${category}`);
} else if (specifier.startsWith("#")) {
  console.log("::error title=Production build failed::Category: package-internal import alias");
} else if (specifier.startsWith("node:")) {
  console.log("::error title=Production build failed::Category: Node built-in import");
} else if (specifier.startsWith("@")) {
  console.log("::error title=Production build failed::Category: scoped package absent from dependency lock");
} else {
  console.log("::error title=Production build failed::Category: bare package absent from dependency lock");
}
