import { Wordmark } from "./Wordmark";

const LINKS = [
  { href: "#estate-planning", label: "Estate Planning" },
  { href: "#wills-trusts", label: "Wills & Trusts" },
  { href: "#probate", label: "Probate" },
  { href: "#privacy", label: "Privacy Policy" },
  { href: "#intake", label: "Contact" },
];

export function Footer() {
  return (
    <footer id="privacy" className="bg-navy-deep text-ivory/80">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark tone="light" />
            <p className="mt-6 max-w-xs font-display text-2xl leading-snug text-ivory">
              Protect What Matters. Plan for What Comes Next.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Explore</p>
            <ul className="mt-5 space-y-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Visit</p>
            <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed">
              <span className="block">100 Example Avenue, Suite 400</span>
              <span className="block">Springfield, ST 00000</span>
              <span className="block pt-3">(555) 010-0142</span>
              <span className="block">hello@sterlinglegacy.example</span>
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-xs leading-relaxed text-ivory/60">
          <p className="max-w-3xl">
            This website is for informational purposes only and does not constitute legal advice.
            Submitting an inquiry does not establish an attorney-client relationship.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between">
            <p>&copy; Sterling Legacy Law. All rights reserved.</p>
            <p>Portfolio demonstration &mdash; fictional firm, not a real law practice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
