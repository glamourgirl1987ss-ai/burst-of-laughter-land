// Renders floating emoji decorations with staggered animations.
type Props = {
  emojis: string[];
  className?: string;
};

const positions = [
  { top: "8%", left: "6%", size: "text-5xl", delay: "0s", rotate: "-12deg" },
  { top: "14%", right: "8%", size: "text-6xl", delay: "0.6s", rotate: "10deg" },
  { top: "55%", left: "4%", size: "text-4xl", delay: "1.2s", rotate: "-6deg" },
  { top: "62%", right: "6%", size: "text-5xl", delay: "0.3s", rotate: "8deg" },
  { top: "30%", left: "44%", size: "text-3xl", delay: "1.8s", rotate: "4deg" },
  { top: "78%", left: "30%", size: "text-4xl", delay: "0.9s", rotate: "-10deg" },
  { top: "20%", left: "26%", size: "text-3xl", delay: "1.5s", rotate: "12deg" },
  { top: "70%", right: "28%", size: "text-5xl", delay: "2.1s", rotate: "-4deg" },
  { top: "40%", right: "20%", size: "text-3xl", delay: "0.4s", rotate: "6deg" },
  { top: "85%", right: "44%", size: "text-4xl", delay: "1.0s", rotate: "-8deg" },
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
