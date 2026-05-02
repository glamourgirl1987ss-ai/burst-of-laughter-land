import { siteContent } from "@/content/landing";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b-4 border-fun-ink/10 bg-fun-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#top"
          className="font-display text-2xl font-bold text-fun-ink md:text-3xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          <span className="text-fun-red">Щуро</span>
          <span className="text-fun-purple">Бъркотия</span>
          <span className="ml-1">🎉</span>
        </a>
        <ul className="hidden items-center gap-2 md:flex">
          {siteContent.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-4 py-2 font-display font-semibold text-fun-ink transition-colors hover:bg-fun-yellow"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#order"
          className="rounded-full bg-fun-red px-4 py-2 font-display text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 md:px-5"
        >
          Поръчай
        </a>
      </div>
    </nav>
  );
}
