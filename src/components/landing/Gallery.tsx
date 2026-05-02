import { siteContent } from "@/content/landing";
import emojiPattern from "@/assets/emoji-pattern.png";

const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-3", "rotate-1"];

export function Gallery() {
  const { gallery } = siteContent;
  return (
    <section
      id="gallery"
      className="relative overflow-hidden px-4 py-20 md:py-28"
      style={{
        backgroundImage: `url(${emojiPattern})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex justify-center">
          <h2
            className="inline-block -rotate-2 rounded-full border-4 border-fun-ink bg-fun-yellow px-8 py-3 font-display text-4xl font-bold text-fun-ink shadow-[6px_6px_0_rgb(0_0_0_/_0.85)] md:px-12 md:py-5 md:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {gallery.heading} 📸
          </h2>
        </div>
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
