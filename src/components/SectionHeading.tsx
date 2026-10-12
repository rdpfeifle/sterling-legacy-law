import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  id?: string;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, id, children, align = "left", className = "" }: Props) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"} ${className}`}>
      {eyebrow && <p className={`eyebrow ${centered ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2
        id={id}
        className="mt-5 font-display text-[2.375rem] font-medium leading-[1.08] tracking-[-0.01em] text-navy text-balance sm:text-5xl"
      >
        {title}
      </h2>
      {children && (
        <div className="mt-5 text-[1.0625rem] leading-relaxed text-charcoal/80 text-pretty">{children}</div>
      )}
    </div>
  );
}
