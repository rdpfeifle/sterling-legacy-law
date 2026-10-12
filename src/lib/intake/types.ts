export const HELP_TYPES = [
  { value: "estate_planning", label: "Estate planning" },
  { value: "will_or_trust", label: "Will or trust" },
  { value: "probate", label: "Probate or estate administration" },
  { value: "power_of_attorney", label: "Power of attorney" },
  { value: "other", label: "Other" },
] as const;

export type HelpTypeKey = (typeof HELP_TYPES)[number]["value"];
export type ContactMethod = "email" | "phone";

export interface IntakeFormValues {
  fullName: string;
  email: string;
  phone: string;
  helpType: HelpTypeKey | "";
  contactMethod: ContactMethod;
  description: string;
  /** Honeypot — hidden from people, so only bots fill it in. */
  company: string;
}

export type IntakeField = Exclude<keyof IntakeFormValues, "company">;
export type IntakeErrors = Partial<Record<IntakeField, string>>;

/** Flat, spreadsheet-friendly shape posted to the n8n webhook. */
export interface IntakePayload {
  submissionId: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  /** "+15551234567", or "" when no phone was given. */
  phoneE164: string;
  helpType: string;
  helpTypeKey: HelpTypeKey;
  contactMethod: ContactMethod;
  description: string;
  source: string;
  pageUrl: string;
}

/**
 * - live: the webhook accepted the inquiry (2xx).
 * - demo: no webhook is configured, so nothing was delivered anywhere.
 * - error: delivery was attempted and failed, or the input was rejected.
 */
export type SubmitResult =
  | { status: "live" }
  | { status: "demo" }
  | { status: "error"; message: string; fieldErrors?: IntakeErrors };

export const EMPTY_VALUES: IntakeFormValues = {
  fullName: "",
  email: "",
  phone: "",
  helpType: "",
  contactMethod: "email",
  description: "",
  company: "",
};
