import { readFileSync } from "node:fs";

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
} else {
  console.log("::error title=Production build failed::Category: identifier absent from dependency lock");
}
