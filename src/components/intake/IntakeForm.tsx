"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { submitIntake } from "@/lib/intake/submitIntake";
import {
  EMPTY_VALUES,
  HELP_TYPES,
  type IntakeErrors,
  type IntakeField,
  type IntakeFormValues,
} from "@/lib/intake/types";
import { FIELD_ORDER, LIMITS, validateIntake } from "@/lib/intake/validate";
import { AlertCircle } from "../Icons";
import { RadioGroup, SelectField, TextAreaField, TextField } from "./fields";
import { SuccessState } from "./SuccessState";

type Status = "idle" | "submitting" | "live" | "demo";

function newSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 14)}`;
}

export function IntakeForm() {
  const [values, setValues] = useState<IntakeFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<IntakeErrors>({});
  const [touched, setTouched] = useState<Partial<Record<IntakeField, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [liveMessage, setLiveMessage] = useState("");

  const inFlight = useRef(false);
  // Reused across retries so n8n can de-duplicate if a request is resent.
  const submissionId = useRef<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    submissionId.current = newSubmissionId();
  }, []);

  const submitting = status === "submitting";
  const visibleError = (field: IntakeField) => (attempted || touched[field] ? errors[field] : undefined);

  function update<K extends keyof IntakeFormValues>(key: K, value: IntakeFormValues[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (formError) setFormError(null);
    // Re-validate live once the user has seen errors, so messages clear as they fix things.
    if (attempted || (key !== "company" && touched[key as IntakeField])) setErrors(validateIntake(next));
    else if (key === "contactMethod" && touched.phone) setErrors(validateIntake(next));
  }

  const onText =
    (key: Exclude<keyof IntakeFormValues, "contactMethod" | "helpType">) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      update(key, e.target.value);

  const onBlur = (field: IntakeField) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validateIntake(values));
  };

  function focusFirstInvalid(errs: IntakeErrors) {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (!first) return;
    const el =
      first === "contactMethod"
        ? formRef.current?.querySelector<HTMLInputElement>('input[name="contactMethod"]')
        : document.getElementById(`intake-${first}`);
    el?.focus();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return; // blocks double-clicks and repeated Enter presses

    setAttempted(true);
    const errs = validateIntake(values);
    setErrors(errs);
    const count = Object.keys(errs).length;
    if (count > 0) {
      setLiveMessage(`Please correct ${count} ${count === 1 ? "field" : "fields"} before submitting.`);
      focusFirstInvalid(errs);
      return;
    }

    inFlight.current = true;
    setStatus("submitting");
    setFormError(null);
    setLiveMessage("Submitting your inquiry…");

    const result = await submitIntake(values, submissionId.current);

    if (result.status === "error") {
      inFlight.current = false;
      setStatus("idle");
      setFormError(result.message);
      setLiveMessage(result.message);
      if (result.fieldErrors) {
        setErrors(result.fieldErrors);
        focusFirstInvalid(result.fieldErrors);
      }
      return;
    }

    setStatus(result.status);
    setLiveMessage("");
    // inFlight stays true until the user explicitly starts a new inquiry.
  }

  function reset() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setTouched({});
    setAttempted(false);
    setFormError(null);
    setStatus("idle");
    submissionId.current = newSubmissionId();
    inFlight.current = false;
  }

  if (status === "live" || status === "demo") {
    return <SuccessState mode={status} name={values.fullName.trim().split(/\s+/)[0]} onReset={reset} />;
  }

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} aria-describedby="intake-required-note" className="space-y-6">
      <p id="intake-required-note" className="text-xs text-muted">
        Fields marked <span className="text-gold-dark">*</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <TextField
            id="intake-fullName"
            name="fullName"
            label="Full name"
            required
            autoComplete="name"
            maxLength={LIMITS.fullName}
            value={values.fullName}
            onChange={onText("fullName")}
            onBlur={onBlur("fullName")}
            disabled={submitting}
            error={visibleError("fullName")}
          />
        </div>
        <TextField
          id="intake-email"
          name="email"
          type="email"
          label="Email address"
          required
          autoComplete="email"
          inputMode="email"
          maxLength={LIMITS.email}
          value={values.email}
          onChange={onText("email")}
          onBlur={onBlur("email")}
          disabled={submitting}
          error={visibleError("email")}
        />
        <TextField
          id="intake-phone"
          name="phone"
          type="tel"
          label="Phone number"
          autoComplete="tel"
          inputMode="tel"
          maxLength={LIMITS.phone}
          value={values.phone}
          onChange={onText("phone")}
          onBlur={onBlur("phone")}
          disabled={submitting}
          error={visibleError("phone")}
        />
      </div>

      <SelectField
        id="intake-helpType"
        name="helpType"
        label="How can we help?"
        required
        placeholder="Select an area of assistance"
        options={HELP_TYPES}
        value={values.helpType}
        onChange={(e) => update("helpType", e.target.value as IntakeFormValues["helpType"])}
        onBlur={onBlur("helpType")}
        disabled={submitting}
        error={visibleError("helpType")}
      />

      <RadioGroup
        name="contactMethod"
        legend="Preferred contact method"
        value={values.contactMethod}
        options={[
          { value: "email", label: "Email" },
          { value: "phone", label: "Phone" },
        ]}
        onChange={(v) => update("contactMethod", v as IntakeFormValues["contactMethod"])}
        disabled={submitting}
        error={visibleError("contactMethod")}
      />

      <TextAreaField
        id="intake-description"
        name="description"
        label="Brief description"
        rows={4}
        maxLength={LIMITS.description}
        placeholder="In a sentence or two, tell us what kind of assistance you're looking for."
        value={values.description}
        onChange={onText("description")}
        onBlur={onBlur("description")}
        disabled={submitting}
        error={visibleError("description")}
      />

      {/* Honeypot: visually hidden and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="intake-company">Company</label>
        <input
          id="intake-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={onText("company")}
        />
      </div>

      {formError && (
        <div role="alert" className="flex items-start gap-3 border border-error/30 bg-error/[0.04] px-4 py-3 text-sm text-error">
          <AlertCircle className="mt-px size-5 shrink-0" />
          <p>{formError}</p>
        </div>
      )}

      <div className="space-y-5 border-t border-stone pt-6">
        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          className="btn btn-primary w-full min-h-[3.25rem] text-[0.9375rem] disabled:cursor-wait disabled:opacity-80"
        >
          {submitting ? (
            <>
              <span aria-hidden="true" className="size-4 animate-spin-slow rounded-full border-2 border-white/30 border-t-white" />
              Submitting…
            </>
          ) : (
            "Submit Inquiry"
          )}
        </button>
        <p className="text-xs leading-relaxed text-muted">
          Please do not include confidential, sensitive, or time-critical information in this form.
          Submitting an inquiry does not establish an attorney-client relationship.{" "}
          <a href="#privacy" className="font-medium text-navy underline decoration-gold underline-offset-4 hover:decoration-navy">
            Privacy Policy
          </a>
        </p>
      </div>

      <p className="sr-only" aria-live="polite" role="status">
        {liveMessage}
      </p>
    </form>
  );
}
