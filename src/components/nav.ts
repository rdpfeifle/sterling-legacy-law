import { SERVICES } from "./services-data";

export const SERVICE_LINKS = SERVICES.map((s) => ({
  href: `#${s.id}`,
  label: s.title,
  short: s.short,
  Icon: s.Icon,
}));

/** Top-level links after the Services dropdown. */
export const NAV_LINKS = [
  { href: "#approach", label: "Our Approach" },
  { href: "#how-it-works", label: "How It Works" },
];
