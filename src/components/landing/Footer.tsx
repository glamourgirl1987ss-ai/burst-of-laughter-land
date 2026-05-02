import { siteContent } from "@/content/landing";

export function Footer() {
  const { footer, brand } = siteContent;
  return (
    <footer className="bg-fun-ink px-4 py-12 text-fun-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <div
            className="font-display text-2xl font-bold"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-fun-yellow">Щуро</span>
            <span className="text-fun-pink">Бъркотия</span> 🎉
          </div>
          <p className="mt-2 font-display text-sm font-semibold text-fun-cream/70">
            {footer.tagline}
          </p>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-fun-cream/10 pt-6 text-center font-display text-xs text-fun-cream/50">
        © {new Date().getFullYear()} {brand}. Всички права запазени.
      </div>
    </footer>
  );
}
