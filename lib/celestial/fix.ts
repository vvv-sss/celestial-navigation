/**
 * Position fix from several intercepts (Marcq St Hilaire method).
 *
 * Each sight gives a line of position (LOP): the line perpendicular to the
 * azimuth, passing through the point that lies `intercept` nautical miles from
 * the assumed position towards (+) or away from (−) the body. When the sights
 * were taken at different times the earlier assumed positions are advanced
 * along the course for the distance run, so every LOP refers to the time of
 * the last sight (a running fix). The fix is the least-squares point closest
 * to all LOPs, which for three lines is the centre of the cocked hat.
 *
 * Local coordinates: x = east (nm), y = north (nm), origin at the reference
 * position. Flat-earth approximation, fine for the few miles involved.
 */

import { DEG } from "./angle";

export interface SightForFix {
  label: string;
  /** Assumed (estimated) position, signed degrees. */
  lat: number;
  lon: number;
  /** True azimuth in degrees. */
  zn: number;
  /** Intercept in nautical miles, + towards. */
  intercept: number;
  /** Seconds since 00:00 UTC, when known. */
  timeSeconds: number | null;
}

export interface Vector {
  x: number;
  y: number;
}

export interface PlottedLop {
  label: string;
  zn: number;
  intercept: number;
  /** Assumed position as entered. */
  ap: Vector;
  /** Assumed position after advancing for the run to the reference time. */
  advancedAp: Vector;
  /** Foot of the intercept: the point on the LOP nearest the advanced AP. */
  foot: Vector;
  /** Distance run between this sight and the reference time (nm). */
  run: number;
}

export interface FixResult {
  /** Origin of the local coordinate system. */
  reference: { lat: number; lon: number };
  lops: PlottedLop[];
  fix: (Vector & { lat: number; lon: number }) | null;
  /** True when at least one LOP was advanced for the vessel's run. */
  advanced: boolean;
  warnings: string[];
}

function toLocal(lat: number, lon: number, ref: { lat: number; lon: number }): Vector {
  return {
    x: (lon - ref.lon) * 60 * Math.cos(ref.lat * DEG),
    y: (lat - ref.lat) * 60,
  };
}

function fromLocal(v: Vector, ref: { lat: number; lon: number }): { lat: number; lon: number } {
  return {
    lat: ref.lat + v.y / 60,
    lon: ref.lon + v.x / (60 * Math.cos(ref.lat * DEG)),
  };
}

/** Hours elapsed from `from` to `to`, allowing for a crossing of midnight. */
function hoursBetween(from: number, to: number): number {
  let dt = to - from;
  if (dt < -12 * 3600) dt += 24 * 3600;
  return dt / 3600;
}

export function computeFix(
  sights: SightForFix[],
  options: { course?: number | null; speed?: number | null } = {}
): FixResult {
  const warnings: string[] = [];
  if (sights.length === 0) {
    return { reference: { lat: 0, lon: 0 }, lops: [], fix: null, advanced: false, warnings };
  }

  // Reference: the assumed position of the latest sight (or the last one entered).
  const timed = sights.filter((s) => s.timeSeconds !== null);
  const last =
    timed.length === sights.length
      ? sights.reduce((a, b) => (hoursBetween(a.timeSeconds!, b.timeSeconds!) >= 0 ? b : a))
      : sights[sights.length - 1];
  const reference = { lat: last.lat, lon: last.lon };

  const canAdvance =
    options.course !== null && options.course !== undefined &&
    options.speed !== null && options.speed !== undefined &&
    timed.length === sights.length;
  if (!canAdvance && sights.some((s) => s.timeSeconds === null)) {
    warnings.push("Sight times are incomplete, so the lines of position were not advanced for the run between sights.");
  } else if (!canAdvance) {
    warnings.push("Course and speed are missing, so the lines of position were not advanced for the run between sights.");
  }

  let advanced = false;
  const lops: PlottedLop[] = sights.map((s) => {
    const ap = toLocal(s.lat, s.lon, reference);
    let run = 0;
    let advancedAp = ap;
    if (canAdvance) {
      const hours = hoursBetween(s.timeSeconds!, last.timeSeconds!);
      run = (options.speed as number) * hours;
      if (Math.abs(run) > 1e-6) {
        advanced = true;
        const c = (options.course as number) * DEG;
        advancedAp = { x: ap.x + run * Math.sin(c), y: ap.y + run * Math.cos(c) };
      }
    }
    const u = { x: Math.sin(s.zn * DEG), y: Math.cos(s.zn * DEG) };
    const foot = { x: advancedAp.x + u.x * s.intercept, y: advancedAp.y + u.y * s.intercept };
    return { label: s.label, zn: s.zn, intercept: s.intercept, ap, advancedAp, foot, run };
  });

  // Least squares: minimise Σ (u_i · P − u_i · foot_i)²
  let a = 0, b = 0, c = 0, e = 0, f = 0;
  for (const lop of lops) {
    const ux = Math.sin(lop.zn * DEG);
    const uy = Math.cos(lop.zn * DEG);
    const k = ux * lop.foot.x + uy * lop.foot.y;
    a += ux * ux;
    b += ux * uy;
    c += uy * uy;
    e += ux * k;
    f += uy * k;
  }
  const det = a * c - b * b;
  let fix: FixResult["fix"] = null;
  if (lops.length >= 2 && Math.abs(det) > 1e-6) {
    const x = (e * c - b * f) / det;
    const y = (a * f - b * e) / det;
    fix = { x, y, ...fromLocal({ x, y }, reference) };
  } else if (lops.length >= 2) {
    warnings.push("The azimuths are too close together to cross the lines of position; choose bodies spread around the horizon.");
  } else {
    warnings.push("At least two sights are needed for a fix.");
  }

  // Angle-of-cut warning for a weak fix.
  if (fix && lops.length >= 2) {
    const angles = lops.map((l) => l.zn);
    let bestCut = 0;
    for (let i = 0; i < angles.length; i++) {
      for (let j = i + 1; j < angles.length; j++) {
        let diff = Math.abs(angles[i] - angles[j]) % 180;
        if (diff > 90) diff = 180 - diff;
        bestCut = Math.max(bestCut, diff);
      }
    }
    if (bestCut < 30) {
      warnings.push("The best angle of cut between lines of position is under 30°, so the fix is weak.");
    }
  }

  return { reference, lops, fix, advanced, warnings };
}
