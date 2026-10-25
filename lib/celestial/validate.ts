/**
 * Lenient parsing and canonical formatting of the text fields on the form.
 *
 * Every field is stored as the raw string the user typed. `parseField` turns a
 * string into a number (or an error), and `normalizeField` rewrites the string
 * in the canonical zero-padded notation once the user leaves the field, so
 * "5" becomes "05.0" for minutes and "45" becomes "045" for a 3-digit angle.
 */

export type FieldKind =
  | "deg90" // 00 – 89 whole degrees
  | "deg180" // 000 – 180 whole degrees (longitude)
  | "deg360" // 000 – 359 whole degrees (hour angles)
  | "minutes" // 00.0 – 59.9 minutes of arc
  | "hoe" // 0.0 – 99.9 metres
  | "hours" // 00 – 23
  | "minsec" // 00 – 59
  | "speed" // 0 – 99.9 knots
  | "course" // 0 – 359.9 degrees
  | "pressure" // 850 – 1100 hPa
  | "temperature"; // −60 – 60 °C

export interface FieldSpec {
  min: number;
  max: number;
  integer: boolean;
  /** Digits before the decimal point when zero-padding. */
  intDigits: number;
  /** Decimal places when zero-padding (0 for integers). */
  decimals: number;
  /** Human readable format hint. */
  hint: string;
}

export const FIELD_SPECS: Record<FieldKind, FieldSpec> = {
  deg90: { min: 0, max: 89, integer: true, intDigits: 2, decimals: 0, hint: "dd · 00–89" },
  deg180: { min: 0, max: 180, integer: true, intDigits: 3, decimals: 0, hint: "ddd · 000–180" },
  deg360: { min: 0, max: 359, integer: true, intDigits: 3, decimals: 0, hint: "ddd · 000–359" },
  minutes: { min: 0, max: 59.9, integer: false, intDigits: 2, decimals: 1, hint: "mm.m · 00.0–59.9" },
  hoe: { min: 0, max: 99.9, integer: false, intDigits: 2, decimals: 1, hint: "metres · 0.0–99.9" },
  hours: { min: 0, max: 23, integer: true, intDigits: 2, decimals: 0, hint: "hh · 00–23" },
  minsec: { min: 0, max: 59, integer: true, intDigits: 2, decimals: 0, hint: "mm · 00–59" },
  speed: { min: 0, max: 99.9, integer: false, intDigits: 2, decimals: 1, hint: "knots · 0.0–99.9" },
  course: { min: 0, max: 359.9, integer: false, intDigits: 3, decimals: 1, hint: "degrees · 000.0–359.9" },
  pressure: { min: 850, max: 1100, integer: true, intDigits: 4, decimals: 0, hint: "hPa · 850–1100" },
  temperature: { min: -60, max: 60, integer: true, intDigits: 2, decimals: 0, hint: "°C · −60–60" },
};

export interface ParsedField {
  /** Parsed number, or null when the field is empty or invalid. */
  value: number | null;
  /** True when the raw string is empty / whitespace. */
  empty: boolean;
  /** Error message when the value is present but not acceptable. */
  error?: string;
}

const NUMBER_RE = /^[-+]?\d*(?:[.,]\d*)?$/;

/** Parse a raw string for the given field kind. Empty strings are not errors. */
export function parseField(kind: FieldKind, raw: string): ParsedField {
  const spec = FIELD_SPECS[kind];
  const text = raw.trim().replace(",", ".");
  if (text === "") return { value: null, empty: true };
  if (!NUMBER_RE.test(text) || text === "-" || text === "+" || text === ".") {
    return { value: null, empty: false, error: `Expected ${spec.hint}` };
  }
  const value = Number(text);
  if (!Number.isFinite(value)) {
    return { value: null, empty: false, error: `Expected ${spec.hint}` };
  }
  if (spec.integer && !Number.isInteger(value)) {
    return { value: null, empty: false, error: `Whole number expected · ${spec.hint}` };
  }
  if (value < spec.min || value > spec.max) {
    return { value: null, empty: false, error: `Out of range · ${spec.hint}` };
  }
  return { value, empty: false };
}

/** Rewrite a valid value in canonical, zero-padded notation. Invalid input is returned untouched. */
export function normalizeField(kind: FieldKind, raw: string): string {
  const parsed = parseField(kind, raw);
  if (parsed.empty || parsed.value === null) return raw.trim();
  return formatField(kind, parsed.value);
}

export function formatField(kind: FieldKind, value: number): string {
  const spec = FIELD_SPECS[kind];
  const abs = Math.abs(value);
  const fixed = abs.toFixed(spec.decimals);
  const [whole, frac] = fixed.split(".");
  const padded = whole.padStart(spec.intDigits, "0");
  const sign = value < 0 ? "-" : "";
  return frac !== undefined ? `${sign}${padded}.${frac}` : `${sign}${padded}`;
}

/**
 * Parse a degrees/minutes pair into decimal degrees. Both parts are optional:
 * a blank pair is reported as `empty`; a half-filled pair is treated as zero
 * for the missing half (so "12" and "" means 12°00.0′).
 */
export interface ParsedAngle {
  value: number | null;
  empty: boolean;
  degError?: string;
  minError?: string;
}

export function parseAngle(
  degKind: "deg90" | "deg180" | "deg360",
  deg: string,
  min: string
): ParsedAngle {
  const d = parseField(degKind, deg);
  const m = parseField("minutes", min);
  const empty = d.empty && m.empty;
  if (d.error || m.error) {
    return { value: null, empty: false, degError: d.error, minError: m.error };
  }
  if (empty) return { value: null, empty: true };
  return { value: (d.value ?? 0) + (m.value ?? 0) / 60, empty: false };
}
