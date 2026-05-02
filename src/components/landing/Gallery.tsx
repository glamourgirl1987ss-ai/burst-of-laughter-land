import { siteContent } from "@/content/landing";
import emojiPatternTile from "@/assets/emoji-pattern-tile.png";

const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-3", "rotate-1"];

export function Gallery() {
  const { gallery } = siteContent;
  return (
    <section
      id="gallery"
      className="relative overflow-hidden px-4 py-20 md:py-28"
      style={{
        backgroundImage: `url(${emojiPatternTile})`,
        backgroundSize: "600px",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2
          className="text-center font-display text-4xl font-bold text-fun-ink md:text-6xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          {gallery.heading} 📸
        </h2>
        <p className="mt-3 text-center font-display text-fun-ink/60">
          (Снимките са примерни – заменете ги с истински!)
        </p>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {gallery.images.map((img, i) => (
            <div
              key={i}
              className={`group overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl transition-transform ${tilts[i % tilts.length]} hover:rotate-0 hover:scale-105`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
