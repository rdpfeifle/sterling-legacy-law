import type { ComponentType, SVGProps } from "react";
import { EstateIcon, ProbateIcon, WillIcon } from "./Icons";

export type Service = {
  id: string;
  title: string;
  body: string;
  /** One-liner for the navigation dropdown. */
  short: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const SERVICES: Service[] = [
  {
    id: "estate-planning",
    title: "Estate Planning",
    body: "Plan ahead with documents and arrangements that reflect your wishes and help protect the people who matter most.",
    short: "Plan ahead for the people who matter most.",
    Icon: EstateIcon,
  },
  {
    id: "wills-trusts",
    title: "Wills & Trusts",
    body: "Explore options for documenting your wishes and planning how your assets may be managed and distributed.",
    short: "Document your wishes and plan for your assets.",
    Icon: WillIcon,
  },
  {
    id: "probate",
    title: "Probate & Estate Administration",
    body: "Navigate the estate administration process with clearer expectations and guidance through the steps ahead.",
    short: "Guidance through the estate administration process.",
    Icon: ProbateIcon,
  },
];
