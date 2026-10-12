import { HELP_TYPES, type IntakeErrors, type IntakeFormValues } from "./types";

const NAME_RE = /^\p{L}[\p{L}\p{M}\s'.-]*$/u;
// local@domain.tld — no spaces, a single @, a dotted domain, and a letters-only TLD of 2+.
const EMAIL_RE = /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
export const US_PHONE_RE = /^\(\d{3}\) \d{3}-\d{4}$/;

export const LIMITS = { fullName: 120, email: 200, description: 1500 };

/** Pure validation shared by the browser form and the API route. */
export function validateIntake(v: IntakeFormValues): IntakeErrors {
  const errors: IntakeErrors = {};
  const name = v.fullName.trim();
  const email = v.email.trim();
  const phone = v.phone.trim();

  if (!name) errors.fullName = "Please enter your full name.";
  else if (!NAME_RE.test(name)) errors.fullName = "Please use letters only for your name.";
  else if ((name.match(/\p{L}/gu) ?? []).length < 2) errors.fullName = "Please enter your full name.";
  else if (name.length > LIMITS.fullName) errors.fullName = "Please shorten your name.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    errors.email = "Please enter a valid email address, like name@example.com.";

  if (phone) {
    if (!US_PHONE_RE.test(phone))
      errors.phone = "Please enter a 10-digit US number, like (555) 123-4567.";
  } else if (v.contactMethod === "phone") {
    errors.phone = "Please add a phone number so we can call you, or choose email.";
  }

  if (!v.helpType) errors.helpType = "Please select how we can help.";
  else if (!HELP_TYPES.some((t) => t.value === v.helpType))
    errors.helpType = "Please select an option from the list.";

  if (v.contactMethod !== "email" && v.contactMethod !== "phone")
    errors.contactMethod = "Please choose a contact method.";

  if (v.description.length > LIMITS.description)
    errors.description = `Please keep this under ${LIMITS.description} characters.`;

  return errors;
}

export const FIELD_ORDER = [
  "fullName",
  "email",
  "phone",
  "helpType",
  "contactMethod",
  "description",
] as const;
