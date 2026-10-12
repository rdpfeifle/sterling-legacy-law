import Image from "next/image";
import heroImage from "../../public/images/hero-library.jpg";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-14 pb-20 pt-12 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pb-28 lg:pt-20">
        <div className="animate-rise">
          <p className="eyebrow">Estate Planning &amp; Probate</p>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[3rem] font-medium leading-[1.02] tracking-[-0.015em] text-navy text-balance sm:text-6xl lg:text-[4.5rem]"
          >
            Your Legacy Deserves{" "}
            <em className="font-normal italic text-navy/90">Thoughtful</em> Planning.
          </h1>
          <div className="mt-8 h-px w-16 bg-gold" aria-hidden="true" />
          <p className="mt-8 max-w-[34rem] text-[1.0625rem] leading-[1.75] text-charcoal/80 text-pretty">
            The decisions you make today can help protect the people and things that matter most
            tomorrow. Whether you&rsquo;re planning for your family&rsquo;s future or navigating the
            loss of a loved one, Sterling Legacy Law offers thoughtful guidance to help you
            understand your options and move forward with confidence.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href="#intake" className="btn btn-primary px-7">
              Get in Touch
            </a>
            <a href="#services" className="btn btn-secondary px-7">
              Explore Our Services
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] animate-rise [animation-delay:150ms] lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 hidden h-full w-full border border-gold/60 sm:block lg:-bottom-5 lg:-right-5"
          />
          <div className="relative aspect-[4/5] overflow-hidden bg-stone lg:aspect-[5/6]">
            <Image
              src={heroImage}
              alt="A quiet, wood-panelled library lined with leather-bound books and marble busts"
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 34rem, 100vw"
              className="object-cover object-[30%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
          </div>
          <div className="absolute -left-3 bottom-8 hidden max-w-[15rem] border border-stone bg-white/95 px-5 py-4 shadow-[0_18px_40px_-24px_rgba(39,52,74,0.45)] backdrop-blur sm:block lg:-left-10">
            <p className="font-display text-lg leading-snug text-navy">
              Protect what matters. Plan for what comes next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
