import { siteContent } from "@/content/landing";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b-4 border-fun-ink/10 bg-fun-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#top"
          className="inline-block -rotate-2 rounded-full border-4 border-fun-ink bg-fun-yellow px-5 py-2 font-display text-2xl font-bold text-fun-ink shadow-[4px_4px_0_rgb(0_0_0_/_0.85)] transition-transform hover:rotate-0 md:text-3xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          ЩуроБъркотия 🎉
        </a>
        <ul className="hidden items-center gap-3 md:flex">
          {siteContent.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-block -rotate-2 rounded-full border-4 border-fun-ink bg-fun-yellow px-4 py-2 font-display font-bold text-fun-ink shadow-[4px_4px_0_rgb(0_0_0_/_0.85)] transition-transform hover:-translate-y-0.5 hover:rotate-0"
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
