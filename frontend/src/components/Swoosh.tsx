// The purple-and-gold corner wave from the business card. Drawn for the
// top-left corner; flip or rotate it with classes for other corners.
export function Swoosh({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <path d="M0 0H372C268 28 126 100 0 222Z" className="fill-violet" />
      <path
        d="M0 238C128 118 276 42 390 0"
        className="stroke-gold"
        strokeWidth="4"
      />
      <path d="M0 0H300C206 24 92 86 0 176Z" className="fill-plum" />
    </svg>
  );
}
