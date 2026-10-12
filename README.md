# Sterling Legacy Law: Landing Page & Intake Form

A landing page for a **fictional** estate planning and probate firm, built as a portfolio demo of
a legal client-intake automation: **website form → n8n → Google Sheets → Gmail draft**.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and TypeScript. It has no other runtime dependencies.

## Run it

```bash
npm install
cp .env.example .env.local   # optional; without it the form runs in demo mode
npm run dev                  # http://localhost:3000
```

## How submission works

```
IntakeForm (client)  →  POST /api/intake (Next.js route)  →  N8N_WEBHOOK_URL
```

| File | Role |
| --- | --- |
| `src/components/intake/IntakeForm.tsx` | UI and state only. Calls `submitIntake()`. |
| `src/lib/intake/submitIntake.ts` | Browser helper that posts to `/api/intake`. |
| `src/app/api/intake/route.ts` | Re-validates input, checks the honeypot, builds the payload, and forwards it. |
| `src/lib/intake/forwardToWebhook.ts` | The only code that knows the webhook URL or secret. |
| `src/lib/intake/validate.ts` | Validation shared by the browser and the server. |

- **The webhook URL is server-side only.** It is never included in the browser bundle, so the browser never contacts n8n directly and no CORS setup is needed.
- **Demo mode:** if `N8N_WEBHOOK_URL` is empty, the API returns `{ status: "demo" }` and the page shows a
  **"Demo submission"** label that says the inquiry was *not sent anywhere*.
- **Live success** is shown only when n8n answers with a 2xx. Timeouts, non-2xx responses, and network errors show
  an inline error and keep everything the user typed.
- **Duplicate protection:** the button is disabled while sending, and an in-flight guard ignores extra clicks and
  Enter presses. Each inquiry has a `submissionId` that stays the same on retries, so n8n can de-duplicate.

### Payload sent to n8n

```json
{
  "submissionId": "57e6ffe4-4851-45e1-9c70-04ad2a799f14",
  "submittedAt": "2026-10-12T17:08:39.158Z",
  "fullName": "Eleanor Whitfield",
  "email": "eleanor.whitfield@example.com",
  "phone": "(555) 014-2290",
  "helpType": "Will or trust",
  "helpTypeKey": "will_or_trust",
  "contactMethod": "email",
  "description": "I'd like to update my will after recently moving states.",
  "source": "sterling-legacy-law-landing",
  "pageUrl": "http://localhost:3000/#intake"
}
```

`helpTypeKey` is one of `estate_planning`, `will_or_trust`, `probate`, `power_of_attorney`, `other`.

## n8n setup checklist

1. **Webhook** node: method `POST`, response mode "When last node finishes" (or "Immediately").
   If you set `N8N_WEBHOOK_SECRET`, add Header Auth with header `X-Intake-Secret`.
2. **Google Sheets → Append row**: map the payload fields to columns (the payload is flat on purpose).
3. **Gmail → Create draft**: address it to `{{$json.email}}` and personalise the message with `fullName` / `helpType`.
4. Put the Webhook URL in `.env.local` as `N8N_WEBHOOK_URL`, then restart `npm run dev`.

## Demo test data (fictional)

| Field | Value |
| --- | --- |
| Full name | Eleanor Whitfield |
| Email | eleanor.whitfield@example.com |
| Phone | (555) 014-2290 |
| How can we help? | Will or trust |
| Contact method | Email |
| Description | I'd like to update my will after recently moving states. |

---

Photos: Unsplash (free license). This is a portfolio demonstration, not a real law firm, and nothing on it is legal advice.
