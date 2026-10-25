/**
 * Sight reduction: from the figures on the form to altitude, azimuth and
 * intercept for one celestial body. Pure functions, no DOM.
 *
 * Conventions
 *  - latitude and declination are signed decimal degrees (+N / −S)
 *  - longitude is signed decimal degrees (+E / −W)
 *  - hour angles are in [0, 360) measured westward
 *  - intercept is in nautical miles, positive TOWARDS the body
 */

import { DEG, RAD, normalize360, signOf, signed } from "./angle";
import type { BodyInput } from "./types";
import { parseAngle, parseField } from "./validate";

export interface StageValidity {
  /** Step 1: EP, sextant altitude, height of eye, time. */
  sights: boolean;
  /** Step 2: almanac hour angle and declination. */
  almanac: boolean;
  /** Step 3: sextant altitude corrections. */
  corrections: boolean;
}

export interface FieldErrors {
  [path: string]: string | undefined;
}

export interface BodyReduction {
  name: string;
  valid: StageValidity;
  errors: FieldErrors;

  /** Time of the sight as seconds since 00:00 UTC, when the time is complete. */
  timeSeconds: number | null;
  lat: number | null;
  lon: number | null;
  /** Sextant altitude as entered. */
  hs: number | null;
  hoe: number | null;

  /** GHA body = GHA (+ SHA) ± v + increment, in [0, 360). */
  ghaBody: number | null;
  /** Local hour angle = GHA body ± longitude, in [0, 360). */
  lha: number | null;
  /** Declination corrected for d, signed. */
  dec: number | null;

  /** Calculated (computed) altitude Hc, signed degrees. */
  hc: number | null;
  /** True azimuth Zn in [0, 360). */
  zn: number | null;
  /** Quadrantal azimuth, e.g. S 52.3° W. */
  quadrant: { ns: "N" | "S"; angle: number; ew: "E" | "W" } | null;

  /** Hs ± index error. */
  ho: number | null;
  /** Ho − dip (apparent altitude). */
  ha: number | null;
  /** Fully corrected (true) altitude. */
  hoTrue: number | null;
  /** Intercept in nautical miles, + towards the body. */
  intercept: number | null;

  /** Suggested table values derived from the figures already entered. */
  hints: {
    /** Dip for the height of eye, minutes of arc (1.76 √h). */
    dip: number | null;
    /** Mean refraction for the apparent altitude, minutes of arc (Bennett). */
    refraction: number | null;
  };
}

/** Standard dip of the sea horizon in minutes of arc for a height of eye in metres. */
export function dipForHeight(metres: number): number {
  return 1.76 * Math.sqrt(metres);
}

/**
 * Mean atmospheric refraction in minutes of arc for an apparent altitude in
 * degrees (Bennett 1982, standard atmosphere 1010 hPa / 10 °C). Accurate to
 * about 0.1′ above 5° which matches the tables navigators use.
 */
export function refractionForAltitude(apparentAltitude: number): number {
  if (!Number.isFinite(apparentAltitude) || apparentAltitude < -1) return Number.NaN;
  const ha = Math.max(apparentAltitude, 0);
  return 1 / Math.tan((ha + 7.31 / (ha + 4.4)) * DEG);
}

/** Computed altitude Hc from LHA, declination and latitude (all in degrees). */
export function computedAltitude(lha: number, dec: number, lat: number): number {
  const sinHc =
    Math.sin(lat * DEG) * Math.sin(dec * DEG) +
    Math.cos(lat * DEG) * Math.cos(dec * DEG) * Math.cos(lha * DEG);
  return Math.asin(Math.max(-1, Math.min(1, sinHc))) * RAD;
}

/**
 * True azimuth Zn in [0, 360) from LHA, declination and latitude. Uses atan2
 * so every quadrant, the prime vertical and the meridian are handled without
 * special cases.
 */
export function trueAzimuth(lha: number, dec: number, lat: number): number {
  const x = -Math.sin(lha * DEG) * Math.cos(dec * DEG);
  const y =
    Math.cos(lat * DEG) * Math.sin(dec * DEG) -
    Math.sin(lat * DEG) * Math.cos(dec * DEG) * Math.cos(lha * DEG);
  return normalize360(Math.atan2(x, y) * RAD);
}

/** Express a true azimuth in quadrantal notation (N 47.7° E, S 52.3° W, …). */
export function quadrantal(zn: number): { ns: "N" | "S"; angle: number; ew: "E" | "W" } {
  const z = normalize360(zn);
  if (z <= 90) return { ns: "N", angle: z, ew: "E" };
  if (z <= 180) return { ns: "S", angle: 180 - z, ew: "E" };
  if (z <= 270) return { ns: "S", angle: z - 180, ew: "W" };
  return { ns: "N", angle: 360 - z, ew: "W" };
}

function minutesOrZero(raw: string, errors: FieldErrors, path: string): number {
  const parsed = parseField("minutes", raw);
  if (parsed.error) errors[path] = parsed.error;
  return parsed.value ?? 0;
}

/** Reduce one body. Never throws; missing data simply yields null results. */
export function reduceBody(body: BodyInput): BodyReduction {
  const errors: FieldErrors = {};

  // ---- Step 1: sights -----------------------------------------------------
  const h = parseField("hours", body.time.h);
  const m = parseField("minsec", body.time.m);
  const s = parseField("minsec", body.time.s);
  if (h.error) errors["time.h"] = h.error;
  if (m.error) errors["time.m"] = m.error;
  if (s.error) errors["time.s"] = s.error;
  const timeComplete = !h.empty && !m.empty && !h.error && !m.error && !s.error;
  const timeSeconds = timeComplete
    ? (h.value ?? 0) * 3600 + (m.value ?? 0) * 60 + (s.value ?? 0)
    : null;

  const latA = parseAngle("deg90", body.lat.deg, body.lat.min);
  if (latA.degError) errors["lat.deg"] = latA.degError;
  if (latA.minError) errors["lat.min"] = latA.minError;
  const lonA = parseAngle("deg180", body.lon.deg, body.lon.min);
  if (lonA.degError) errors["lon.deg"] = lonA.degError;
  if (lonA.minError) errors["lon.min"] = lonA.minError;
  const hsA = parseAngle("deg90", body.hs.deg, body.hs.min);
  if (hsA.degError) errors["hs.deg"] = hsA.degError;
  if (hsA.minError) errors["hs.min"] = hsA.minError;
  const hoeP = parseField("hoe", body.hoe);
  if (hoeP.error) errors["hoe"] = hoeP.error;

  const lat = latA.value === null ? null : signed(latA.value, body.lat.hemisphere);
  const lon = lonA.value === null ? null : signed(lonA.value, body.lon.hemisphere);
  const hs = hsA.value;
  const hoe = hoeP.value;

  const sightsValid =
    lat !== null && lon !== null && hs !== null && hoe !== null && timeComplete &&
    !Object.keys(errors).some((k) =>
      k.startsWith("time") || k.startsWith("lat") || k.startsWith("lon") || k.startsWith("hs") || k === "hoe"
    );

  // ---- Step 2: almanac ----------------------------------------------------
  const ghaA = parseAngle("deg360", body.gha.deg, body.gha.min);
  if (ghaA.degError) errors["gha.deg"] = ghaA.degError;
  if (ghaA.minError) errors["gha.min"] = ghaA.minError;
  const shaA = parseAngle("deg360", body.sha.deg, body.sha.min);
  if (shaA.degError) errors["sha.deg"] = shaA.degError;
  if (shaA.minError) errors["sha.min"] = shaA.minError;
  const incA = parseAngle("deg90", body.inc.deg, body.inc.min);
  if (incA.degError) errors["inc.deg"] = incA.degError;
  if (incA.minError) errors["inc.min"] = incA.minError;
  const decA = parseAngle("deg90", body.dec.deg, body.dec.min);
  if (decA.degError) errors["dec.deg"] = decA.degError;
  if (decA.minError) errors["dec.min"] = decA.minError;
  const v = signOf(body.v.sign) * minutesOrZero(body.v.min, errors, "v.min");
  const d = signOf(body.d.sign) * minutesOrZero(body.d.min, errors, "d.min");

  const almanacHasErrors = Object.keys(errors).some((k) =>
    ["gha", "sha", "inc", "dec", "v", "d"].some((p) => k.startsWith(p))
  );
  const almanacValid = ghaA.value !== null && decA.value !== null && !almanacHasErrors;

  let ghaBody: number | null = null;
  let lha: number | null = null;
  let dec: number | null = null;
  if (almanacValid) {
    ghaBody = normalize360(ghaA.value! + (shaA.value ?? 0) + v / 60 + (incA.value ?? 0));
    if (lon !== null) lha = normalize360(ghaBody + lon);
    // A d-correction can carry the declination across the equator; the sign
    // of the signed value then flips automatically.
    dec = signed(decA.value!, body.dec.hemisphere) +
      (body.dec.hemisphere === "S" ? -d / 60 : d / 60);
  }

  // ---- Computed altitude & azimuth ---------------------------------------
  let hc: number | null = null;
  let zn: number | null = null;
  let quadrant: BodyReduction["quadrant"] = null;
  if (lha !== null && dec !== null && lat !== null) {
    hc = computedAltitude(lha, dec, lat);
    zn = trueAzimuth(lha, dec, lat);
    quadrant = quadrantal(zn);
  }

  // ---- Step 3: sextant corrections ---------------------------------------
  const ie = signOf(body.ie.sign) * minutesOrZero(body.ie.min, errors, "ie.min");
  const dip = minutesOrZero(body.dip, errors, "dip");
  const tc = signOf(body.tc.sign) * minutesOrZero(body.tc.min, errors, "tc.min");
  const ac = minutesOrZero(body.ac, errors, "ac");
  const ulc = minutesOrZero(body.ulc, errors, "ulc");
  const arc = signOf(body.arc.sign) * minutesOrZero(body.arc.min, errors, "arc.min");

  const correctionsHasErrors = Object.keys(errors).some((k) =>
    ["ie", "dip", "tc", "ac", "ulc", "arc"].some((p) => k.startsWith(p))
  );
  const correctionsValid = hs !== null && !correctionsHasErrors;

  let ho: number | null = null;
  let ha: number | null = null;
  let hoTrue: number | null = null;
  let intercept: number | null = null;
  if (hs !== null && !correctionsHasErrors) {
    ho = hs + ie / 60;
    ha = ho - dip / 60;
    hoTrue = ha + tc / 60 + ac / 60 - ulc / 60 + arc / 60;
    if (hc !== null) intercept = (hoTrue - hc) * 60;
  }

  return {
    name: body.name.trim(),
    valid: { sights: sightsValid, almanac: almanacValid, corrections: correctionsValid },
    errors,
    timeSeconds,
    lat,
    lon,
    hs,
    hoe,
    ghaBody,
    lha,
    dec,
    hc,
    zn,
    quadrant,
    ho,
    ha,
    hoTrue,
    intercept,
    hints: {
      dip: hoe !== null ? dipForHeight(hoe) : null,
      refraction: ha !== null ? refractionForAltitude(ha) : null,
    },
  };
}
