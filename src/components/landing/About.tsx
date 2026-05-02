import { siteContent, type CardColor } from "@/content/landing";

const colorMap: Record<CardColor, { bg: string; text: string; ring: string }> = {
  yellow: { bg: "bg-fun-yellow", text: "text-fun-ink", ring: "ring-fun-ink/10" },
  blue: { bg: "bg-fun-blue", text: "text-white", ring: "ring-fun-ink/10" },
  red: { bg: "bg-fun-red", text: "text-white", ring: "ring-fun-ink/10" },
};

export function About() {
  const { about } = siteContent;
  return (
    <section id="about" className="relative overflow-hidden bg-fun-cream px-4 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            className="font-display text-4xl font-bold text-fun-ink md:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {about.heading} <span className="inline-block">🎲</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-display text-lg font-semibold text-fun-ink/80 md:text-xl">
            {about.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {about.cards.map((card) => {
            const c = colorMap[card.color];
            return (
              <div
                key={card.color}
                className={`group relative ${card.rotation} transition-transform hover:rotate-0 hover:-translate-y-2 hover:scale-105`}
              >
                <div
                  className={`relative aspect-[3/4] rounded-3xl ${c.bg} ${c.text} p-6 shadow-[0_12px_0_rgb(0_0_0_/_0.15)] ring-4 ${c.ring}`}
                >
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <span className="text-7xl drop-shadow-md">{card.emoji}</span>
                    <h3 className="mt-6 font-display text-3xl font-bold md:text-4xl">
                      {card.title}
                    </h3>
                    <p className="mt-2 font-display text-xl font-semibold opacity-90">
                      {card.subtitle}
                    </p>
                  </div>
                  <div className="absolute right-3 top-3 font-display text-2xl font-bold opacity-30">
                    ?
                  </div>
                  <div className="absolute bottom-3 left-3 rotate-180 font-display text-2xl font-bold opacity-30">
                    ?
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-3xl border-4 border-dashed border-fun-purple bg-white p-6 text-center shadow-lg md:p-8">
          <span className="text-5xl">⭐</span>
          <h3 className="mt-2 font-display text-2xl font-bold text-fun-purple md:text-3xl">
            {about.bonus.title}
          </h3>
          <p className="mt-2 font-display text-lg font-semibold text-fun-ink/80">
            {about.bonus.text}
          </p>
        </div>
      </div>
    </section>
  );
}
