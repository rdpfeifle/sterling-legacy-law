import { TURNSTILE_ACTION } from "./types";

/**
 * Server-side Turnstile check (canonical siteverify). Fails closed: a missing secret,
 * an empty hostname allowlist, a network error or any mismatch all return false.
 */
export async function verifyTurnstile(token: unknown, remoteIp?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET?.trim();
  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );

  if (
    !secret ||
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    expectedHostnames.size === 0
  ) {
    return false;
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({
        secret,
        response: token,
        ...(remoteIp && { remoteip: remoteIp }),
      }),
    });
    if (!res.ok) throw new Error(`siteverify ${res.status}`);
    const result = (await res.json()) as { success?: boolean; action?: string; hostname?: string };
    if (
      result.success !== true ||
      result.action !== TURNSTILE_ACTION ||
      !expectedHostnames.has(result.hostname ?? "")
    ) {
      console.error("[intake] turnstile rejected:", JSON.stringify(result));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[intake] turnstile verification failed:", (err as Error).message);
    return false;
  }
}
