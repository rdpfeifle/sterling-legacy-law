type WordmarkProps = { tone?: "dark" | "light"; className?: string };

export function Wordmark({ tone = "dark", className = "" }: WordmarkProps) {
  const text = tone === "dark" ? "text-navy" : "text-ivory";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="relative grid size-9 shrink-0 place-items-center border border-gold"
      >
        <span className="absolute inset-[3px] border border-gold/40" />
        <span className={`font-display text-[15px] font-semibold leading-none tracking-wide ${text}`}>
          SL
        </span>
      </span>
      <span className={`font-sans text-[13px] font-semibold tracking-[0.26em] ${text}`}>
        STERLING LEGACY LAW
      </span>
    </span>
  );
}
