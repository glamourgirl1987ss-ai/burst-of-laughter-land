// Renders floating emoji decorations with staggered animations.
type Props = {
  emojis: string[];
  className?: string;
};

const positions = [
  { top: "6%", left: "4%", size: "text-7xl md:text-8xl", delay: "0s", rotate: "-12deg" },
  { top: "10%", right: "5%", size: "text-7xl md:text-9xl", delay: "0.6s", rotate: "10deg" },
  { top: "55%", left: "2%", size: "text-6xl md:text-8xl", delay: "1.2s", rotate: "-6deg" },
  { top: "60%", right: "3%", size: "text-7xl md:text-9xl", delay: "0.3s", rotate: "8deg" },
  { top: "30%", left: "42%", size: "text-5xl md:text-7xl", delay: "1.8s", rotate: "4deg" },
  { top: "80%", left: "20%", size: "text-6xl md:text-8xl", delay: "0.9s", rotate: "-10deg" },
  { top: "22%", left: "20%", size: "text-5xl md:text-7xl", delay: "1.5s", rotate: "12deg" },
  { top: "72%", right: "22%", size: "text-6xl md:text-8xl", delay: "2.1s", rotate: "-4deg" },
  { top: "42%", right: "18%", size: "text-5xl md:text-7xl", delay: "0.4s", rotate: "6deg" },
  { top: "86%", right: "40%", size: "text-6xl md:text-8xl", delay: "1.0s", rotate: "-8deg" },
] as const;

export function FloatingEmojis({ emojis, className = "" }: Props) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {emojis.map((e, i) => {
        const p = positions[i % positions.length];
        return (
          <span
            key={i}
            className={`absolute ${p.size} drop-shadow-md select-none`}
            style={{
              top: p.top,
              left: "left" in p ? p.left : undefined,
              right: "right" in p ? p.right : undefined,
              animation: `float ${5 + (i % 4)}s ease-in-out infinite`,
              animationDelay: p.delay,
              ["--r" as never]: p.rotate,
            }}
          >
            {e}
          </span>
        );
      })}
    </div>
  );
}
