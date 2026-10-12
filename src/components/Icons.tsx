import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Shield with a small house — protecting family and home. */
export function EstateIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 2.75 4.5 5.5v5.75c0 4.6 3.1 8.5 7.5 10 4.4-1.5 7.5-5.4 7.5-10V5.5L12 2.75Z" />
      <path d="M8.75 12.25 12 9.5l3.25 2.75v3.5h-6.5v-3.5Z" />
      <path d="M11 15.75v-2h2v2" />
    </Base>
  );
}

/** Folded document with signature line and pen nib. */
export function WillIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14.5 2.75H6.75A1.75 1.75 0 0 0 5 4.5v15a1.75 1.75 0 0 0 1.75 1.75h10.5A1.75 1.75 0 0 0 19 19.5V7.25l-4.5-4.5Z" />
      <path d="M14.5 2.75v4.5H19" />
      <path d="M8.5 11h7M8.5 14h5" />
      <path d="M8.5 17.75c1-.9 1.75-.9 2.25 0s1.25.9 2.25 0" />
    </Base>
  );
}

/** Classical columns — estate administration. */
export function ProbateIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 8.5 12 3.75l8.5 4.75" />
      <path d="M4.5 8.5h15" />
      <path d="M6.5 11v6.5M10 11v6.5M14 11v6.5M17.5 11v6.5" />
      <path d="M4.5 20.25h15M3.75 17.75h16.5" />
    </Base>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Base strokeWidth={1.5} {...props}>
      <path d="M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5" />
    </Base>
  );
}

export function CheckCircle(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="m8.25 12.25 2.5 2.5 5-5.25" />
    </Base>
  );
}

export function InfoCircle(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 11v5.25M12 7.75v.01" />
    </Base>
  );
}

export function AlertCircle(props: IconProps) {
  return (
    <Base strokeWidth={1.5} {...props}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 7.5v5.25M12 16.25v.01" />
    </Base>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Base strokeWidth={1.5} {...props}>
      <path d="M4 7.5h16M4 12h16M4 16.5h16" />
    </Base>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Base strokeWidth={1.5} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Base>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <Base strokeWidth={1.5} {...props}>
      <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
    </Base>
  );
}
