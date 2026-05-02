import { siteContent } from "@/content/landing";
import { FloatingEmojis } from "./FloatingEmojis";
import { SplashBg } from "./SplashBg";

export function Hero() {
  const { hero } = siteContent;
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[88vh] items-center justify-center overflow-hidden px-4 py-16 md:py-24"
    >
      <SplashBg />
      <FloatingEmojis emojis={hero.floatingEmojis} />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="inline-block rounded-full border-4 border-fun-ink/10 bg-white px-4 py-1.5 font-display text-sm font-bold tracking-wide text-fun-purple shadow-md">
          🃏 КАРТОВА ИГРА ЗА СМЯХ 🃏
        </span>
        <h1
          className="mt-6 font-display text-5xl font-bold leading-[0.95] text-fun-ink md:text-7xl lg:text-8xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          <span className="inline-block animate-[wiggle_3s_ease-in-out_infinite] text-fun-red">
            Щуро
          </span>
          <span className="inline-block text-fun-purple">Бъркотия</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-display text-xl font-semibold text-fun-ink md:text-2xl">
          {hero.tagline} 💥
        </p>
        <p className="mt-3 font-display text-2xl font-bold text-fun-blue md:text-3xl">
          {hero.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#order"
            className="group relative inline-flex items-center gap-2 rounded-full bg-fun-red px-8 py-4 font-display text-lg font-bold text-white shadow-[0_8px_0_rgb(0_0_0_/_0.15)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_0_rgb(0_0_0_/_0.18)] active:translate-y-1 active:shadow-[0_4px_0_rgb(0_0_0_/_0.18)] md:text-xl"
          >
            <span>{hero.cta}</span>
            <span className="transition-transform group-hover:translate-x-1">🎁</span>
          </a>
          <a
            href="#how"
            className="rounded-full border-4 border-fun-ink/10 bg-white px-6 py-3 font-display font-bold text-fun-ink shadow-md transition-transform hover:scale-105"
          >
            Как се играе?
          </a>
        </div>
      </div>
    </section>
  );
}
