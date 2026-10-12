"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";
import { ArrowRight, ChevronDown, CloseIcon, MenuIcon } from "./Icons";
import { NAV_LINKS, SERVICE_LINKS } from "./nav";

const topLink =
  "relative py-2 text-sm text-charcoal/80 transition-colors hover:text-navy after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100";

function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Touch devices fire mouseenter right before click on a tap, so hover behaviour is
  // limited to devices with a real hover-capable pointer.
  const canHover = useRef(false);

  const clearTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => clearTimer, []);

  return (
    <li
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        if (!canHover.current) return;
        clearTimer();
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (!canHover.current) return;
        clearTimer();
        closeTimer.current = setTimeout(() => setOpen(false), 120);
      }}
      onBlur={(e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={(e) => {
          // With a hover pointer the panel is already open under the cursor, so a mouse
          // click only ever opens it. Keyboard (detail 0) and touch clicks toggle.
          if (canHover.current && e.detail > 0) setOpen(true);
          else setOpen((o) => !o);
        }}
        className={`${topLink} inline-flex items-center gap-1.5 ${open ? "text-navy after:scale-x-100" : ""}`}
      >
        Services
        <ChevronDown className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id="services-menu"
        onFocus={() => setOpen(true)}
        className={`absolute left-1/2 top-full z-50 w-[25rem] -translate-x-1/2 pt-4 transition-[opacity,transform] duration-150 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="relative border border-stone bg-white shadow-[0_24px_48px_-24px_rgba(39,52,74,0.35)]">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gold" />
          <ul className="p-2">
            {SERVICE_LINKS.map(({ href, label, short, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-4 rounded-[2px] p-3.5 transition-colors hover:bg-ivory focus-visible:bg-ivory"
                >
                  <span className="grid size-10 shrink-0 place-items-center border border-stone text-gold transition-colors group-hover:border-gold/60">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-medium leading-snug text-navy">{label}</span>
                    <span className="mt-0.5 block text-[0.8125rem] leading-snug text-charcoal/70">{short}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="border-t border-stone bg-stone-light/60 px-5 py-3">
            <a href="#services" onClick={() => setOpen(false)} className="text-link group/all text-[0.8125rem]">
              View all services
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/all:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setServicesOpen(false);
  };

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
          <ul className="flex items-center gap-10">
            <ServicesDropdown />
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={topLink}>
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
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-stone bg-ivory lg:hidden">
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="divide-y divide-stone">
            <li>
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="mobile-services"
                onClick={() => setServicesOpen((o) => !o)}
                className="flex w-full items-center justify-between py-4 text-left font-display text-2xl text-navy transition-colors hover:text-gold-dark"
              >
                Services
                <ChevronDown className={`size-5 text-gold transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <ul id="mobile-services" hidden={!servicesOpen} className="mb-4 space-y-1 border-l border-gold/50 pl-4">
                {SERVICE_LINKS.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={close}
                      className="flex items-center gap-3 py-2.5 text-[0.9375rem] text-charcoal/85 transition-colors hover:text-navy"
                    >
                      <Icon className="size-5 shrink-0 text-gold" />
                      {label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#services" onClick={close} className="text-link py-2.5 text-[0.8125rem]">
                    View all services
                  </a>
                </li>
              </ul>
            </li>
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
