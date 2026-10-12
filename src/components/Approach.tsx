import Image from "next/image";
import approachImage from "../../public/images/approach-notes.jpg";
import { SectionHeading } from "./SectionHeading";

const PRINCIPLES = ["We listen first", "Clear, practical language", "Your priorities guide the plan"];

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="py-24 lg:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="relative order-2 lg:order-1">
          <div aria-hidden="true" className="absolute -left-4 -top-4 hidden h-full w-full border border-gold/50 sm:block lg:-left-5 lg:-top-5" />
          <div className="relative aspect-[4/3] overflow-hidden bg-stone lg:aspect-[5/6]">
            <Image
              src={approachImage}
              alt="An open notebook with a fountain pen and reading glasses on a wooden desk"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[60%_50%]"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading id="approach-title" eyebrow="Our Approach" title="Personal Guidance. Clarity at Every Step.">
            <p>
              Planning for the future or managing a loved one&rsquo;s estate can feel overwhelming. We
              believe the process should begin with listening, understanding your priorities, and
              explaining your options in clear, practical language.
            </p>
            <p className="mt-5">
              Our goal is to help you feel informed about the decisions ahead and understand the next
              steps available to you.
            </p>
          </SectionHeading>
          <ul className="mt-10 border-t border-stone">
            {PRINCIPLES.map((p) => (
              <li key={p} className="flex items-center gap-4 border-b border-stone py-4 text-charcoal/85">
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
