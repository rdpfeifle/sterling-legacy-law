import { toE164 } from "./format";
import { HELP_TYPES, type IntakeFormValues, type IntakePayload } from "./types";

const TIMEOUT_MS = 15_000;

export function buildPayload(
  v: IntakeFormValues,
  meta: { submissionId: string; pageUrl: string },
): IntakePayload {
  const helpTypeKey = v.helpType as IntakePayload["helpTypeKey"];
  return {
    submissionId: meta.submissionId,
    submittedAt: new Date().toISOString(),
    fullName: v.fullName.trim(),
    email: v.email.trim().toLowerCase(),
    phone: v.phone.trim(),
    phoneE164: toE164(v.phone),
    helpType: HELP_TYPES.find((t) => t.value === helpTypeKey)?.label ?? helpTypeKey,
    helpTypeKey,
    contactMethod: v.contactMethod,
    description: v.description.trim(),
    source: "sterling-legacy-law-landing",
    pageUrl: meta.pageUrl,
  };
}

/** Returns null when no webhook is configured (demo mode). */
export function getWebhookConfig() {
  const url = process.env.N8N_WEBHOOK_URL?.trim();
  if (!url) return null;
  return { url, secret: process.env.N8N_WEBHOOK_SECRET?.trim() || undefined };
}

export async function forwardToWebhook(
  payload: IntakePayload,
  config: { url: string; secret?: string },
): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(config.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(config.secret ? { "X-Intake-Secret": config.secret } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) console.error(`[intake] webhook responded ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error("[intake] webhook request failed:", (err as Error).message);
    return false;
  } finally {
    clearTimeout(timer);
  }
}
