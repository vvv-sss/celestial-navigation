"use client"

import * as React from "react"

import {
  FIELD_SPECS,
  normalizeField,
  type EastWest,
  type FieldKind,
  type Hemisphere,
  type PlusMinus,
} from "@/lib/celestial"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------------ */
/* Numeric text field                                                       */
/* ------------------------------------------------------------------------ */

interface NumInputProps {
  kind: FieldKind
  value: string
  onChange: (value: string) => void
  label: string
  placeholder?: string
  error?: string
  className?: string
  autoFocus?: boolean
}

export function NumInput({
  kind,
  value,
  onChange,
  label,
  placeholder,
  error,
  className,
  autoFocus,
}: NumInputProps) {
  const spec = FIELD_SPECS[kind]
  const width =
    spec.intDigits + spec.decimals + (spec.decimals ? 1 : 0) + (spec.min < 0 ? 1 : 0)
  return (
    <input
      type="text"
      inputMode="decimal"
      autoComplete="off"
      autoFocus={autoFocus}
      aria-label={label}
      aria-invalid={error ? true : undefined}
      title={error ?? spec.hint}
      placeholder={placeholder ?? "0".repeat(spec.intDigits) + (spec.decimals ? ".0" : "")}
      value={value}
      maxLength={width + 1}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => {
        const normalized = normalizeField(kind, e.target.value)
        if (normalized !== e.target.value) onChange(normalized)
      }}
      onFocus={(e) => e.target.select()}
      className={cn("sheet-input", className)}
      style={{ width: `calc(${width}ch + 1.5rem)` }}
    />
  )
}

/* ------------------------------------------------------------------------ */
/* Toggle buttons (N/S, E/W, +/−)                                           */
/* ------------------------------------------------------------------------ */

interface ToggleProps<T extends string> {
  value: T
  options: readonly [T, T]
  onChange: (value: T) => void
  label: string
}

export function CycleToggle<T extends string>({ value, options, onChange, label }: ToggleProps<T>) {
  const next = value === options[0] ? options[1] : options[0]
  const display = value === "-" ? "−" : value
  return (
    <button
      type="button"
      className="sheet-toggle"
      aria-label={`${label}: ${value}. Switch to ${next}`}
      onClick={() => onChange(next)}
    >
      {display}
    </button>
  )
}

/* ------------------------------------------------------------------------ */
/* Degrees + minutes (+ hemisphere)                                         */
/* ------------------------------------------------------------------------ */

interface AngleInputProps {
  label: string
  degKind: "deg90" | "deg180" | "deg360"
  deg: string
  min: string
  onDeg: (v: string) => void
  onMin: (v: string) => void
  degError?: string
  minError?: string
  hemisphere?: Hemisphere | EastWest
  onHemisphere?: (v: Hemisphere | EastWest) => void
  hemisphereOptions?: readonly [Hemisphere, Hemisphere] | readonly [EastWest, EastWest]
}

export function AngleInput({
  label,
  degKind,
  deg,
  min,
  onDeg,
  onMin,
  degError,
  minError,
  hemisphere,
  onHemisphere,
  hemisphereOptions,
}: AngleInputProps) {
  return (
    <div className="flex items-center gap-1">
      <NumInput kind={degKind} value={deg} onChange={onDeg} label={`${label} degrees`} error={degError} />
      <Unit>°</Unit>
      <NumInput kind="minutes" value={min} onChange={onMin} label={`${label} minutes`} error={minError} />
      <Unit>′</Unit>
      {hemisphere && onHemisphere && hemisphereOptions ? (
        <CycleToggle
          value={hemisphere}
          options={hemisphereOptions as readonly [string, string]}
          onChange={(v) => onHemisphere(v as Hemisphere | EastWest)}
          label={`${label} hemisphere`}
        />
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* Signed minutes of arc                                                    */
/* ------------------------------------------------------------------------ */

interface MinutesInputProps {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  sign?: PlusMinus
  onSign?: (v: PlusMinus) => void
  /** Optional suggested value with a one-click "use" button. */
  suggestion?: { value: number; title: string } | null
}

export function MinutesInput({ label, value, onChange, error, sign, onSign, suggestion }: MinutesInputProps) {
  const suggestionText = suggestion && Number.isFinite(suggestion.value) ? suggestion.value.toFixed(1) : null
  return (
    <div className="flex flex-wrap items-center gap-1">
      {sign && onSign ? (
        <CycleToggle value={sign} options={["+", "-"] as const} onChange={onSign} label={`${label} sign`} />
      ) : null}
      <NumInput kind="minutes" value={value} onChange={onChange} label={label} error={error} />
      <Unit>′</Unit>
      {suggestionText ? (
        <button
          type="button"
          title={suggestion!.title}
          onClick={() => onChange(normalizeField("minutes", suggestionText))}
          className="ml-1 rounded border border-primary/20 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-foreground/50 uppercase transition-colors hover:border-primary/50 hover:text-primary"
        >
          ≈ {suggestionText}′
        </button>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* UTC time                                                                 */
/* ------------------------------------------------------------------------ */

interface TimeInputProps {
  h: string
  m: string
  s: string
  onChange: (part: "h" | "m" | "s", v: string) => void
  errors: { h?: string; m?: string; s?: string }
}

export function TimeInput({ h, m, s, onChange, errors }: TimeInputProps) {
  return (
    <div className="flex items-center gap-1">
      <NumInput kind="hours" value={h} onChange={(v) => onChange("h", v)} label="Hours UTC" error={errors.h} />
      <Unit>:</Unit>
      <NumInput kind="minsec" value={m} onChange={(v) => onChange("m", v)} label="Minutes" error={errors.m} />
      <Unit>:</Unit>
      <NumInput kind="minsec" value={s} onChange={(v) => onChange("s", v)} label="Seconds" error={errors.s} />
      <span className="ml-1 font-mono text-[10px] tracking-widest text-foreground/40 uppercase">UTC</span>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* Read-only computed value                                                 */
/* ------------------------------------------------------------------------ */

export function Computed({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-2 font-mono text-sm tabular-nums",
        highlight ? "rounded bg-primary/15 px-2 font-bold text-primary" : "text-primary"
      )}
    >
      <span className="text-primary/50">|</span>
      {children}
    </span>
  )
}

export function Unit({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-xs text-foreground/40">{children}</span>
}
