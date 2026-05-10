import { siteContent, type CardColor } from "@/content/landing";
import emojiPattern from "@/assets/emoji-pattern.png";

const colorMap: Record<CardColor, { bg: string; text: string; ring: string }> = {
  yellow: {
    bg: "bg-fun-yellow",
    text: "text-fun-ink",
    ring: "ring-fun-ink/10",
  },
  blue: {
    bg: "bg-fun-blue",
    text: "text-white",
    ring: "ring-fun-ink/10",
  },
  red: {
    bg: "bg-fun-red",
    text: "text-white",
    ring: "ring-fun-ink/10",
  },
};

export function About() {
  const { about } = siteContent;

  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 py-20 md:py-28"
      style={{
        backgroundImage: `url(${emojiPattern})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* SECTION TITLE */}
        <div className="flex flex-col items-center text-center">
          <h2
            className="inline-block -rotate-2 rounded-full border-4 border-fun-ink bg-fun-yellow px-8 py-3 font-display text-4xl font-bold text-fun-ink shadow-[6px_6px_0_rgb(0_0_0_/_0.85)] md:px-12 md:py-5 md:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {about.heading} <span className="inline-block">🎲</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl rotate-1 rounded-3xl border-4 border-fun-ink bg-fun-yellow px-6 py-4 font-display text-lg font-bold text-fun-ink shadow-[6px_6px_0_rgb(0_0_0_/_0.85)] md:text-xl">
            {about.intro}
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {about.cards.map((card) => {
            const c = colorMap[card.color];

            return (
              <div
                key={card.color}
                className={`group relative ${card.rotation} transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:scale-105`}
              >
                {/* CARD */}
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-3xl ${c.bg} ${c.text} shadow-[0_12px_0_rgb(0_0_0_/_0.15)] ring-4 ${c.ring}`}
                >
                  {card.image ? (
                    <>
                      {/* IMAGE */}
                      <img
                        src={card.image}
                        alt={`${card.title} – ${card.subtitle}`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      {/* TEXT BUBBLE */}
                      <div className="absolute inset-x-4 bottom-4 z-10 flex justify-center">
                        <div className="max-w-[90%] rounded-[28px] border-4 border-fun-ink bg-white/95 px-5 py-4 text-center shadow-[5px_5px_0_rgb(0_0_0_/_0.25)] backdrop-blur-sm">
                          <h3 className="font-display text-2xl font-bold text-fun-ink md:text-3xl">{card.title}</h3>

                          <p className="mt-1 font-display text-base font-semibold text-fun-ink/80 md:text-lg">
                            {card.subtitle}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
                      {/* DECORATIONS */}
                      <div className="absolute right-3 top-3 font-display text-2xl font-bold opacity-30">?</div>

                      <div className="absolute bottom-3 left-3 rotate-180 font-display text-2xl font-bold opacity-30">
                        ?
                      </div>

                      {/* EMOJI */}
                      <span className="text-7xl drop-shadow-md">{card.emoji}</span>

                      {/* TEXT BUBBLE */}
                      <div className="mt-6 rounded-[28px] border-4 border-fun-ink bg-white/95 px-5 py-4 shadow-[5px_5px_0_rgb(0_0_0_/_0.25)]">
                        <h3 className="font-display text-3xl font-bold text-fun-ink md:text-4xl">{card.title}</h3>

                        <p className="mt-2 font-display text-xl font-semibold text-fun-ink/80">{card.subtitle}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BONUS */}
        <div className="mt-14 rounded-3xl border-4 border-dashed border-fun-purple bg-white p-6 text-center shadow-lg md:p-8">
          <span className="text-5xl">⭐</span>

          <h3 className="mt-2 font-display text-2xl font-bold text-fun-purple md:text-3xl">{about.bonus.title}</h3>

          <p className="mt-2 font-display text-lg font-semibold text-fun-ink/80">{about.bonus.text}</p>
        </div>
      </div>
    </section>
  );
}
