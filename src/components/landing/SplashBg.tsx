// Decorative paint-splash blobs used as section backgrounds.
// Variants offer different colour mixes so each section feels fresh
// without becoming visually overwhelming.
type Variant = "default" | "warm" | "cool" | "rainbow";

const blobs: Record<Variant, Array<{ pos: string; size: string; color: string; opacity: string }>> = {
  default: [
    { pos: "-top-20 -left-20", size: "h-80 w-80", color: "bg-fun-yellow", opacity: "opacity-50" },
    { pos: "top-1/3 -right-24", size: "h-96 w-96", color: "bg-fun-pink", opacity: "opacity-40" },
    { pos: "bottom-0 left-1/4", size: "h-72 w-72", color: "bg-fun-blue", opacity: "opacity-40" },
    { pos: "-bottom-20 right-1/3", size: "h-72 w-72", color: "bg-fun-purple", opacity: "opacity-30" },
  ],
  warm: [
    { pos: "-top-16 right-10", size: "h-80 w-80", color: "bg-fun-yellow", opacity: "opacity-50" },
    { pos: "top-1/2 -left-24", size: "h-96 w-96", color: "bg-fun-red", opacity: "opacity-30" },
    { pos: "-bottom-24 right-1/4", size: "h-80 w-80", color: "bg-fun-pink", opacity: "opacity-40" },
  ],
  cool: [
    { pos: "-top-20 left-1/4", size: "h-80 w-80", color: "bg-fun-blue", opacity: "opacity-40" },
    { pos: "top-1/3 -right-20", size: "h-96 w-96", color: "bg-fun-purple", opacity: "opacity-35" },
    { pos: "-bottom-16 -left-16", size: "h-72 w-72", color: "bg-fun-pink", opacity: "opacity-35" },
  ],
  rainbow: [
    { pos: "-top-16 -left-16", size: "h-72 w-72", color: "bg-fun-yellow", opacity: "opacity-45" },
    { pos: "-top-10 right-1/4", size: "h-72 w-72", color: "bg-fun-pink", opacity: "opacity-40" },
    { pos: "top-1/3 -right-16", size: "h-80 w-80", color: "bg-fun-blue", opacity: "opacity-40" },
    { pos: "-bottom-20 left-1/3", size: "h-80 w-80", color: "bg-fun-purple", opacity: "opacity-35" },
    { pos: "bottom-1/4 -right-12", size: "h-64 w-64", color: "bg-fun-red", opacity: "opacity-25" },
  ],
};

// Small confetti dots scattered subtly across the section.
const dots = [
  { top: "12%", left: "8%", color: "bg-fun-red" },
  { top: "20%", right: "12%", color: "bg-fun-yellow" },
  { top: "55%", left: "5%", color: "bg-fun-purple" },
  { top: "70%", right: "8%", color: "bg-fun-blue" },
  { top: "85%", left: "30%", color: "bg-fun-pink" },
  { top: "35%", right: "30%", color: "bg-fun-yellow" },
];

export function SplashBg({
  className = "",
  variant = "default",
  showDots = true,
}: {
  className?: string;
  variant?: Variant;
  showDots?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {blobs[variant].map((b, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.pos} ${b.size} ${b.color} ${b.opacity}`}
        />
      ))}
      {showDots &&
        dots.map((d, i) => (
          <span
            key={`d-${i}`}
            className={`absolute h-3 w-3 rounded-full ${d.color} opacity-60`}
            style={{
              top: d.top,
              left: "left" in d ? (d as { left: string }).left : undefined,
              right: "right" in d ? (d as { right: string }).right : undefined,
            }}
          />
        ))}
    </div>
  );
}
