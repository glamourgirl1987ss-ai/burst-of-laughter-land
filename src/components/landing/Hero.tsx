import { siteContent } from "@/content/landing";
import { FloatingEmojis } from "./FloatingEmojis";
import heroBg from "@/assets/hero-bg.png";

export function Hero() {
  const { hero } = siteContent;
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden px-4 py-16 md:py-24"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Soft dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      <FloatingEmojis emojis={hero.floatingEmojis} />
      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-end pb-4 text-center md:justify-end md:pb-8">
        <p className="mx-auto max-w-2xl font-display text-2xl font-bold text-white drop-shadow-[0_3px_0_rgb(0_0_0_/_0.6)] md:text-4xl">
          {hero.tagline} 💥
        </p>
        <p className="mt-3 font-display text-3xl font-bold text-fun-yellow drop-shadow-[0_3px_0_rgb(0_0_0_/_0.7)] md:text-5xl">
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
