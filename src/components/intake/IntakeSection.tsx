import { IntakeForm } from "./IntakeForm";

export function IntakeSection() {
  return (
    <section id="intake" aria-labelledby="intake-title" className="relative border-t border-stone py-24 lg:py-32">
      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start lg:pt-10">
            <p className="eyebrow">Let&rsquo;s Start a Conversation</p>
            <h2
              id="intake-title"
              className="mt-5 font-display text-[2.5rem] font-medium leading-[1.05] tracking-[-0.01em] text-navy sm:text-[3.25rem]"
            >
              How Can We Help You?
            </h2>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-charcoal/80">
              Tell us a little about what brings you here. Our team will review your inquiry and
              follow up regarding the next steps.
            </p>
            <dl className="mt-10 hidden space-y-5 border-t border-stone pt-8 text-sm lg:block">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Office</dt>
                <dd className="mt-1.5 text-charcoal/80">100 Example Avenue, Suite 400</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Phone</dt>
                <dd className="mt-1.5 text-charcoal/80">(555) 010-0142</dd>
              </div>
            </dl>
          </div>

          <div className="relative border border-stone bg-white p-6 shadow-[0_40px_80px_-48px_rgba(39,52,74,0.35)] sm:p-10 lg:p-12">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-navy via-navy to-gold" />
            <IntakeForm />
          </div>
        </div>
      </div>
    </section>
  );
}
