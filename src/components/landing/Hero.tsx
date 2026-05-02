import { siteContent } from "@/content/landing";
import emojiPattern from "@/assets/emoji-pattern.png";

export function Hero() {
  const { hero } = siteContent;
  const titleLetters = Array.from(hero.title);
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden px-4 py-16 md:py-24"
      style={{
        backgroundImage: `url(${emojiPattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="fun-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
          {titleLetters.map((ch, i) => (
            <span
              key={i}
              className="fun-title-letter"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
        <div className="mt-6 inline-block -rotate-2 rounded-2xl border-4 border-fun-ink bg-fun-yellow px-5 py-2 shadow-[6px_6px_0_rgb(0_0_0_/_0.85)] md:px-7 md:py-3">
          <p className="font-display text-xl font-extrabold text-fun-ink md:text-3xl">
            🤪 {hero.tagline} 💥
          </p>
        </div>
        <p className="mt-4 font-display text-2xl font-bold text-white drop-shadow-[0_3px_0_rgb(0_0_0_/_0.8)] md:text-4xl">
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
