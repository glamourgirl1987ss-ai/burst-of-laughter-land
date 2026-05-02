// Decorative paint-splash blobs used as section backgrounds.
export function SplashBg({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-fun-yellow/60 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-fun-pink/50 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-fun-blue/50 blur-3xl" />
      <div className="absolute -bottom-20 right-1/3 h-72 w-72 rounded-full bg-fun-purple/40 blur-3xl" />
    </div>
  );
}
