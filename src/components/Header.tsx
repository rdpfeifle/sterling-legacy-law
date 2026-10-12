"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";
import { CloseIcon, MenuIcon } from "./Icons";
import { NAV_LINKS } from "./nav";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 960 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-stone bg-ivory/95 shadow-[0_1px_0_rgba(39,52,74,0.03)] backdrop-blur"
          : "border-transparent bg-ivory"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-page flex h-[4.75rem] items-center justify-between gap-6">
        <a href="#top" aria-label="Sterling Legacy Law — back to top" onClick={close}>
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative py-2 text-sm text-charcoal/80 transition-colors hover:text-navy after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#intake" className="btn btn-primary hidden min-h-11 px-5 sm:inline-flex">
            Schedule a Consultation
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-[2px] border border-stone text-navy transition-colors hover:border-navy/40 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-stone bg-ivory lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="divide-y divide-stone">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  className="block py-4 font-display text-2xl text-navy transition-colors hover:text-gold-dark"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#intake" onClick={close} className="btn btn-primary mt-4 w-full">
            Schedule a Consultation
          </a>
        </nav>
      </div>
    </header>
  );
}
