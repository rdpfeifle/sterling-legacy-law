"use client";

import { useEffect, useRef } from "react";
import { CheckCircle, InfoCircle } from "../Icons";

type Props = { mode: "live" | "demo"; name?: string; onReset: () => void };

export function SuccessState({ mode, name, onReset }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    headingRef.current?.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const isDemo = mode === "demo";

  return (
    <div className="animate-rise py-6 text-center sm:py-10" role="status">
      <span
        className={`mx-auto grid size-16 place-items-center rounded-full border ${
          isDemo ? "border-gold/50 text-gold-dark" : "border-gold/60 text-gold"
        }`}
      >
        {isDemo ? <InfoCircle className="size-8" /> : <CheckCircle className="size-8" />}
      </span>

      {isDemo && (
        <p className="mt-6 inline-flex items-center gap-2 border border-gold/40 bg-gold/10 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-dark">
          Demo submission
        </p>
      )}

      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 font-display text-[2rem] font-medium leading-tight text-navy focus:outline-none sm:text-4xl"
      >
        {isDemo ? "Demo Submission Complete" : `Thank you${name ? `, ${name}` : ""}.`}
      </h3>

      <div className="mx-auto mt-4 max-w-md leading-relaxed text-charcoal/80">
        {isDemo ? (
          <p>
            No intake webhook is configured, so this inquiry was <strong className="font-semibold text-navy">not sent anywhere</strong>.
            Set <code className="rounded bg-stone-light px-1.5 py-0.5 text-[0.8125rem]">N8N_WEBHOOK_URL</code> to
            deliver submissions to your workflow.
          </p>
        ) : (
          <p>
            Your inquiry has been received. Our team will review it and follow up regarding the next
            steps.
          </p>
        )}
      </div>

      <div className="mx-auto mt-8 h-px w-12 bg-gold" aria-hidden="true" />
      <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-muted">
        Submitting an inquiry does not establish an attorney-client relationship.
      </p>

      <button type="button" onClick={onReset} className="text-link mt-8">
        Submit another inquiry
      </button>
    </div>
  );
}
