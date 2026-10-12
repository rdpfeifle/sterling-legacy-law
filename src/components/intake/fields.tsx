import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { AlertCircle } from "../Icons";

const control =
  "block w-full rounded-[2px] border bg-white px-4 text-[0.9375rem] text-charcoal placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-[3px] disabled:cursor-not-allowed disabled:bg-stone-light";

function controlState(error?: string) {
  return error
    ? "border-error focus:border-error focus:ring-error/15"
    : "border-stone-dark hover:border-navy/40 focus:border-navy focus:ring-navy/10";
}

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function FieldShell({ id, label, required, hint, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-navy">
        <span>
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-gold-dark">
              *
            </span>
          )}
        </span>
        {!required && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-muted">
          {hint}
        </p>
      )}
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-[0.8125rem] text-error">
      <AlertCircle className="mt-px size-4 shrink-0" />
      {error}
    </p>
  );
}

export function describedBy(id: string, error?: string, hint?: string) {
  return [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
}

type TextFieldProps = Omit<FieldShellProps, "children"> & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ id, label, required, hint, error, ...input }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        className={`${control} ${controlState(error)} h-12`}
        {...input}
      />
    </FieldShell>
  );
}

type SelectFieldProps = Omit<FieldShellProps, "children"> &
  SelectHTMLAttributes<HTMLSelectElement> & { options: readonly { value: string; label: string }[]; placeholder: string };

export function SelectField({ id, label, required, hint, error, options, placeholder, ...select }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy(id, error, hint)}
          className={`${control} ${controlState(error)} h-12 appearance-none pr-11 ${select.value ? "" : "text-muted/80"}`}
          {...select}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-charcoal">
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-navy/60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </FieldShell>
  );
}

type TextAreaFieldProps = Omit<FieldShellProps, "children"> & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ id, label, required, hint, error, ...textarea }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        className={`${control} ${controlState(error)} min-h-32 resize-y py-3 leading-relaxed`}
        {...textarea}
      />
    </FieldShell>
  );
}

type RadioGroupProps = {
  name: string;
  legend: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
};

export function RadioGroup({ name, legend, value, options, onChange, disabled, error }: RadioGroupProps) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="text-sm font-medium text-navy">{legend}</legend>
      <div className="mt-2 grid grid-cols-2 gap-3">
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={`flex h-12 cursor-pointer items-center gap-3 rounded-[2px] border px-4 text-[0.9375rem] transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-dark ${
                checked ? "border-navy bg-navy/[0.03] text-navy" : "border-stone-dark text-charcoal hover:border-navy/40"
              } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                disabled={disabled}
                onChange={() => onChange(o.value)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`grid size-[18px] place-items-center rounded-full border transition-colors ${
                  checked ? "border-navy" : "border-navy/30"
                }`}
              >
                <span className={`size-2 rounded-full bg-navy transition-transform ${checked ? "scale-100" : "scale-0"}`} />
              </span>
              {o.label}
            </label>
          );
        })}
      </div>
      <ErrorText id={name} error={error} />
    </fieldset>
  );
}
