/**
 * Angle helpers for sexagesimal (degrees + decimal minutes) arithmetic.
 * All internal calculations use decimal degrees; this module converts to and
 * from the "ddd°mm.m′" notation navigators use on the sight-reduction form.
 */

export const DEG = Math.PI / 180;
export const RAD = 180 / Math.PI;

export type Hemisphere = "N" | "S";
export type EastWest = "E" | "W";
export type PlusMinus = "+" | "-";

/** Combine whole degrees and decimal minutes into decimal degrees. */
export function dmToDeg(deg: number, min: number): number {
  return deg + min / 60;
}

/** Apply a sign to a magnitude depending on the hemisphere (N/E positive). */
export function signed(
  value: number,
  hemisphere: Hemisphere | EastWest
): number {
  return hemisphere === "S" || hemisphere === "W" ? -value : value;
}

export function signOf(sign: PlusMinus): 1 | -1 {
  return sign === "-" ? -1 : 1;
}

/** Normalise an angle into the range [0, 360). */
export function normalize360(value: number): number {
  let v = value % 360;
  if (v < 0) v += 360;
  // −1e-14 + 360 rounds to exactly 360 in floating point; fold it back to 0.
  if (v >= 360) v = 0;
  return v;
}

export interface DegMin {
  /** Whole degrees (always >= 0; sign is reported separately). */
  deg: number;
  /** Decimal minutes rounded to 0.1′, in [0, 60). */
  min: number;
  /** -1 for negative angles, otherwise 1. */
  sign: 1 | -1;
}

/**
 * Split decimal degrees into degrees and minutes, rounding minutes to 0.1′
 * and carrying 60.0′ into the degrees so "12°59.97′" becomes "13°00.0′".
 */
export function degToDM(value: number): DegMin {
  const sign: 1 | -1 = value < 0 ? -1 : 1;
  const abs = Math.abs(value);
  let deg = Math.floor(abs);
  let min = Math.round((abs - deg) * 600) / 10;
  if (min >= 60) {
    min -= 60;
    deg += 1;
  }
  return { deg, min, sign };
}

export interface FormatOptions {
  /** Number of digits for the degrees part (2 for latitude/altitude, 3 for hour angles). */
  degDigits?: 2 | 3;
  /** Hemisphere letter to append, e.g. "N" or "W". */
  suffix?: string;
  /** Show a leading minus sign for negative values. Defaults to true. */
  showSign?: boolean;
}

/** Format decimal degrees as `ddd°mm.m′`. */
export function formatDM(value: number, options: FormatOptions = {}): string {
  const { degDigits = 2, suffix, showSign = true } = options;
  if (!Number.isFinite(value)) return "—";
  const { deg, min, sign } = degToDM(value);
  const degText = String(deg).padStart(degDigits, "0");
  const minText = min.toFixed(1).padStart(4, "0");
  const prefix = showSign && sign < 0 ? "−" : "";
  return `${prefix}${degText}°${minText}′${suffix ? ` ${suffix}` : ""}`;
}

/** Format a signed latitude (+N / −S) as `dd°mm.m′ N`. */
export function formatLatitude(value: number): string {
  return formatDM(Math.abs(value), {
    degDigits: 2,
    suffix: value < 0 ? "S" : "N",
  });
}

/** Format a signed longitude (+E / −W) as `ddd°mm.m′ E`. */
export function formatLongitude(value: number): string {
  return formatDM(Math.abs(value), {
    degDigits: 3,
    suffix: value < 0 ? "W" : "E",
  });
}

/** Format minutes of arc, e.g. `04.0′`, with an explicit sign when requested. */
export function formatMinutes(value: number, withSign = false): string {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  const text = abs.toFixed(1).padStart(4, "0");
  if (!withSign) return `${text}′`;
  return `${value < 0 ? "−" : "+"}${text}′`;
}

/** Format decimal degrees with one decimal, e.g. `232.3°`. */
export function formatDegrees(value: number, digits: 2 | 3 = 3): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 10) / 10;
  const [whole, frac = "0"] = rounded.toFixed(1).split(".");
  return `${whole.padStart(digits, "0")}.${frac}°`;
}
