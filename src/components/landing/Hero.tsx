import { siteContent } from "@/content/landing";
import emojiPattern from "@/assets/emoji-pattern.png";
import titleLogo from "@/assets/title-logo.png";

export function Hero() {
  const { hero } = siteContent;
  return (
    <section
      id="top"
      className="relative flex items-center justify-center px-2 py-6"
      style={{
        backgroundImage: `url(${emojiPattern})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="sr-only">
          ЩуроБъркотия – българската картова игра, която ще ви взриви от смях
        </h1>
        <img
          src={titleLogo}
          alt="ЩуроБъркотия – заглавно лого на картовата игра"
          width={1024}
          height={512}
          fetchPriority="high"
          className="relative z-[60] -mt-20 mx-auto w-full max-w-4xl drop-shadow-[0_8px_0_rgb(0_0_0_/_0.15)] animate-title-float md:mt-0"
        />
        <div className="-mt-12 md:-mt-20 inline-block -rotate-2 rounded-2xl border-4 border-fun-ink bg-fun-yellow px-8 py-4 shadow-[6px_6px_0_rgb(0_0_0_/_0.85)] md:px-12 md:py-6">
          <p className="font-display text-2xl font-extrabold text-fun-ink md:text-5xl">
            🤪 {hero.tagline} 💥
          </p>
        </div>
        <div
          className="relative z-[70] mt-6 inline-block rotate-1 animate-float rounded-full border-4 border-fun-ink bg-fun-pink px-6 py-2 shadow-[5px_5px_0_rgb(0_0_0_/_0.85)] md:mt-8 md:px-8 md:py-3"
          style={{ ["--r" as string]: "1deg" }}
        >
          <span className="sr-only">Цена:</span>
          <span className="font-display text-4xl font-extrabold tracking-tight text-fun-ink md:text-5xl">
            {hero.price}
          </span>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
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
