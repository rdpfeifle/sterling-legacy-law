import { toE164 } from "./format";
import { HELP_TYPES, type IntakeFormValues, type IntakePayload } from "./types";

export function buildPayload(v: IntakeFormValues, submissionId: string, pageUrl: string): IntakePayload {
  return {
    submissionId,
    submittedAt: new Date().toISOString(),
    fullName: v.fullName.trim(),
    email: v.email.trim().toLowerCase(),
    phone: v.phone,
    phoneE164: toE164(v.phone),
    helpType: HELP_TYPES.find((t) => t.value === v.helpType)?.label ?? v.helpType,
    helpTypeKey: v.helpType as IntakePayload["helpTypeKey"],
    contactMethod: v.contactMethod,
    description: v.description.trim(),
    source: "sterling-legacy-law-landing",
    pageUrl,
  };
}

/** Posts to n8n. Returns true on a 2xx response. */
export async function forwardToWebhook(url: string, payload: IntakePayload): Promise<boolean> {
  const secret = process.env.N8N_WEBHOOK_SECRET?.trim();
  const header = process.env.N8N_WEBHOOK_SECRET_HEADER?.trim() || "X-Intake-Secret";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(secret && { [header]: secret }) },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) console.error(`[intake] webhook responded ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error("[intake] webhook request failed:", (err as Error).message);
    return false;
  }
}
