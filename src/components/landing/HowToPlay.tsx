import { siteContent } from "@/content/landing";
import { SplashBg } from "./SplashBg";

const stepColors = ["bg-fun-yellow", "bg-fun-blue", "bg-fun-red", "bg-fun-purple"];
const stepText = ["text-fun-ink", "text-white", "text-white", "text-white"];

export function HowToPlay() {
  const { how } = siteContent;
  return (
    <section
      id="how"
      className="relative overflow-hidden bg-fun-pink/30 px-4 py-20 md:py-28"
    >
      <SplashBg variant="warm" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2
          className="text-center font-display text-4xl font-bold text-fun-ink md:text-6xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          {how.heading} 🎮
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {how.steps.map((step, i) => (
            <div
              key={i}
              className={`relative rounded-3xl ${stepColors[i]} ${stepText[i]} p-6 shadow-[0_10px_0_rgb(0_0_0_/_0.15)] transition-transform hover:-translate-y-2`}
            >
              <div className="absolute -top-5 -left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white font-display text-2xl font-bold text-fun-ink shadow-md ring-4 ring-fun-ink/10">
                {i + 1}
              </div>
              <div className="mt-2 text-5xl">{step.emoji}</div>
              <p className="mt-4 font-display leading-snug md:text-xl font-serif text-3xl font-extrabold text-center">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
