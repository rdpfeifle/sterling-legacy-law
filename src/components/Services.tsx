import { ArrowRight } from "./Icons";
import { SectionHeading } from "./SectionHeading";
import { SERVICES, type Service } from "./services-data";

function ServiceCard({ id, title, body, Icon, index }: Service & { index: number }) {
  return (
    <article
      id={id}
      aria-labelledby={`${id}-title`}
      className="group relative flex flex-col border border-stone bg-white p-8 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_24px_48px_-32px_rgba(39,52,74,0.4)] sm:p-10"
    >
      <div className="flex items-start justify-between">
        <span className="grid size-14 place-items-center border border-stone text-gold transition-colors duration-300 group-hover:border-gold/60">
          <Icon className="size-7" />
        </span>
        <span aria-hidden="true" className="font-display text-sm italic text-gold-dark/70">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 id={`${id}-title`} className="mt-8 font-display text-[1.75rem] font-medium leading-tight text-navy">
        {title}
      </h3>
      <p className="mt-4 flex-1 leading-relaxed text-charcoal/75">{body}</p>
      <div className="mt-8 border-t border-stone pt-6">
        <a href="#intake" className="text-link group/link" aria-label={`Learn more about ${title}`}>
          Learn More
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-y border-stone bg-stone-light py-24 lg:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="services-title" eyebrow="Our Services" title="Guidance for Life's Important Decisions" />
          <p className="max-w-md text-[1.0625rem] leading-relaxed text-charcoal/80 lg:pb-2">
            Every family has different priorities. We help you navigate important legal matters with
            a thoughtful, practical approach tailored to your circumstances.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-16 lg:gap-8">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
