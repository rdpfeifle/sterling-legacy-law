const STEPS = [
  {
    n: "01",
    title: "Tell Us About Your Needs",
    body: "Share your contact information and the general type of assistance you're seeking.",
  },
  {
    n: "02",
    title: "Our Team Reviews Your Inquiry",
    body: "Your inquiry is directed to the appropriate team member for follow-up.",
  },
  {
    n: "03",
    title: "Discuss Your Next Steps",
    body: "We'll follow up to discuss your inquiry and potential next steps.",
  },
];

export function NextSteps() {
  return (
    <section aria-labelledby="next-steps-title" className="bg-navy py-24 text-ivory lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center !text-gold">What Happens Next</p>
          <h2
            id="next-steps-title"
            className="mt-5 font-display text-[2.375rem] font-medium leading-[1.08] text-ivory sm:text-5xl"
          >
            A Clearer Path Forward
          </h2>
        </div>
        <ol className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="bg-navy p-8 sm:p-10">
              <span className="font-display text-5xl font-normal italic leading-none text-gold">{s.n}</span>
              <div aria-hidden="true" className="mt-6 h-px w-10 bg-gold/50" />
              <h3 className="mt-6 font-display text-2xl font-medium leading-snug text-ivory">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-ivory/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

