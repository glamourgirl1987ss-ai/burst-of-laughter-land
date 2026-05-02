import { siteContent } from "@/content/landing";
import emojiPattern from "@/assets/emoji-pattern.png";
import boxCover from "@/assets/box-cover.png";

export function Product() {
  const { product } = siteContent;
  return (
    <section
      className="relative overflow-hidden px-4 py-20 md:py-28"
      style={{
        backgroundImage: `url(${emojiPattern})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Box mockup */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 -rotate-6 rounded-[2rem] bg-fun-yellow shadow-2xl" />
          <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-fun-pink shadow-xl" />
          <div
            className="relative aspect-square overflow-hidden rounded-[2rem] shadow-[0_20px_0_rgb(0_0_0_/_0.2)] ring-8 ring-white"
            style={{ animation: "float 5s ease-in-out infinite" }}
          >
            <img
              src={boxCover}
              alt="ЩуроБъркотия"
              className="h-full w-full object-cover"
            />
            <span className="absolute -right-4 -top-4 rotate-12 rounded-full bg-fun-yellow px-3 py-1 font-display text-sm font-bold text-fun-ink shadow-md ring-4 ring-white">
              NEW!
            </span>
          </div>
        </div>

        {/* Features */}
        <div>
          <div className="flex justify-start">
            <h2
              className="inline-block -rotate-2 rounded-full border-4 border-fun-ink bg-fun-yellow px-8 py-3 font-display text-4xl font-bold text-fun-ink shadow-[6px_6px_0_rgb(0_0_0_/_0.85)] md:px-10 md:py-4 md:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              {product.heading} 📦
            </h2>
          </div>
          <div className="mt-6 flex justify-start">
            <p className="inline-block rotate-1 rounded-3xl border-4 border-fun-ink bg-fun-yellow px-6 py-3 font-display text-lg font-bold text-fun-ink shadow-[6px_6px_0_rgb(0_0_0_/_0.85)]">
              {product.description}
            </p>
          </div>
          <ul className="mt-8 space-y-4">
            {product.features.map((f) => (
              <li
                key={f.label}
                className="flex items-center gap-4 rounded-2xl border-4 border-fun-ink/10 bg-white p-4 shadow-md transition-transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-fun-yellow text-3xl shadow-inner">
                  {f.emoji}
                </span>
                <span className="font-display text-xl font-bold text-fun-ink md:text-2xl">
                  {f.label}
                </span>
              </li>
            ))}
          </ul>
          <a
            href="#order"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-fun-purple px-7 py-3.5 font-display text-lg font-bold text-white shadow-[0_8px_0_rgb(0_0_0_/_0.15)] transition-all hover:-translate-y-1"
          >
            Поръчай сега 🎁
          </a>
        </div>
      </div>
    </section>
  );
}
