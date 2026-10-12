import { EMPTY_VALUES, type IntakeFormValues, type SubmitResult } from "@/lib/intake/types";
import { validateIntake } from "@/lib/intake/validate";
import { buildPayload, forwardToWebhook, getWebhookConfig } from "@/lib/intake/forwardToWebhook";

const UUID_RE = /^[0-9a-f-]{16,64}$/i;

function json(body: SubmitResult, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ status: "error", message: "Invalid request." }, 400);
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string) : "");
  const values: IntakeFormValues = {
    ...EMPTY_VALUES,
    fullName: str("fullName"),
    email: str("email"),
    phone: str("phone"),
    helpType: str("helpType") as IntakeFormValues["helpType"],
    contactMethod: str("contactMethod") as IntakeFormValues["contactMethod"],
    description: str("description"),
    company: str("company"),
  };

  const config = getWebhookConfig();

  // Honeypot filled: quietly accept without forwarding anything.
  if (values.company) return json({ status: config ? "live" : "demo" });

  const fieldErrors = validateIntake(values);
  if (Object.keys(fieldErrors).length > 0) {
    return json(
      { status: "error", message: "Please review the highlighted fields.", fieldErrors },
      422,
    );
  }

  const submissionId = UUID_RE.test(str("submissionId")) ? str("submissionId") : crypto.randomUUID();
  const pageUrl = str("pageUrl").slice(0, 500);
  const payload = buildPayload(values, { submissionId, pageUrl });

  if (!config) {
    console.info("[intake] demo mode — N8N_WEBHOOK_URL not set; payload not sent:", payload);
    return json({ status: "demo" });
  }

  const ok = await forwardToWebhook(payload, config);
  return ok
    ? json({ status: "live" })
    : json(
        {
          status: "error",
          message: "We couldn't submit your inquiry just now. Please try again in a moment.",
        },
        502,
      );
}
