/**
 * Input sanitisers and formatters, applied as the user types and reused on the server.
 */

/** Letters (any language), spaces, apostrophes, hyphens and periods: "José O'Brien-Smith Jr." */
export function sanitizeName(raw: string): string {
  return raw
    .replace(/[’‘]/g, "'")
    .replace(/[^\p{L}\p{M}\s'.-]/gu, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s+/, "");
}

export function sanitizeEmail(raw: string): string {
  return raw.replace(/\s/g, "");
}

/** Bare digits from any phone string, without a leading US country code. */
export function phoneDigits(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

/**
 * Progressive US format: "(555", "(555) 123", "(555) 123-4567".
 * Separators only appear once the digits after them exist, so Backspace never gets stuck.
 */
export function formatUSPhone(raw: string): string {
  const d = phoneDigits(raw);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** "+15551234567", or "" when there is no complete number. */
export function toE164(formatted: string): string {
  const d = phoneDigits(formatted);
  return d.length === 10 ? `+1${d}` : "";
}
