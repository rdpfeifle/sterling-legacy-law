import type { IntakeFormValues, SubmitResult } from "./types";

const TIMEOUT_MS = 20_000;

/**
 * Browser-side submission. Posts to this site's own /api/intake route, which
 * holds the n8n webhook URL server-side. The UI only ever talks to this function.
 */
export async function submitIntake(
  values: IntakeFormValues,
  submissionId: string,
): Promise<SubmitResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch("/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, submissionId, pageUrl: window.location.href }),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => null)) as SubmitResult | null;
    if (data && (data.status === "live" || data.status === "demo" || data.status === "error"))
      return data;
    return { status: "error", message: genericError };
  } catch {
    return { status: "error", message: genericError };
  } finally {
    clearTimeout(timer);
  }
}

const genericError =
  "We couldn't submit your inquiry just now. Please check your connection and try again.";
