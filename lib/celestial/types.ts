import type { EastWest, Hemisphere, PlusMinus } from "./angle";

/** A degrees + minutes field pair exactly as typed by the user. */
export interface DegMinInput {
  deg: string;
  min: string;
}

export interface SignedMinutesInput {
  sign: PlusMinus;
  min: string;
}

export interface TimeInput {
  h: string;
  m: string;
  s: string;
}

/** Everything the navigator enters for one celestial body (one sight). */
export interface BodyInput {
  /** Free text, e.g. "Venus", "Nunki". */
  name: string;
  /** UTC time of the sight. */
  time: TimeInput;
  /** Estimated (assumed) position at the time of the sight. */
  lat: DegMinInput & { hemisphere: Hemisphere };
  lon: DegMinInput & { hemisphere: EastWest };
  /** Sextant altitude Hs. */
  hs: DegMinInput;
  /** Height of eye in metres. */
  hoe: string;

  /** Almanac: GHA of the body (planets) or of Aries (stars) for the whole hour. */
  gha: DegMinInput;
  /** Almanac: SHA of the star (stars only, otherwise zero). */
  sha: DegMinInput;
  /** Almanac: v correction for Moon / planets. */
  v: SignedMinutesInput;
  /** Almanac: increment for minutes and seconds of UTC. */
  inc: DegMinInput;
  /** Almanac: declination for the whole hour. */
  dec: DegMinInput & { hemisphere: Hemisphere };
  /** Almanac: d correction for Sun / Moon / planets. */
  d: SignedMinutesInput;

  /** Sextant index error (+ off the arc, − on the arc). */
  ie: SignedMinutesInput;
  /** Dip of the horizon for the height of eye. */
  dip: string;
  /** Total (refraction) correction for stars and planets, normally negative. */
  tc: SignedMinutesInput;
  /** Additional correction for Mars / Venus / Moon parallax. */
  ac: string;
  /** Upper-limb correction for the Moon (subtracted). */
  ulc: string;
  /** Additional refraction correction for non-standard pressure / temperature. */
  arc: SignedMinutesInput;
}

export interface VoyageInput {
  /** ISO date (yyyy-mm-dd). */
  date: string;
  /** Speed over ground in knots. */
  speed: string;
  /** Course over ground in degrees true. */
  course: string;
  /** Atmospheric pressure in hPa. */
  pressure: string;
  /** Air temperature in °C. */
  temperature: string;
}

export interface SheetInput {
  voyage: VoyageInput;
  bodies: [BodyInput, BodyInput, BodyInput];
}

export const BODY_COUNT = 3;

export function emptyDegMin(): DegMinInput {
  return { deg: "", min: "" };
}

export function emptySignedMinutes(): SignedMinutesInput {
  return { sign: "+", min: "" };
}

export function emptyBody(): BodyInput {
  return {
    name: "",
    time: { h: "", m: "", s: "" },
    lat: { deg: "", min: "", hemisphere: "N" },
    lon: { deg: "", min: "", hemisphere: "E" },
    hs: emptyDegMin(),
    hoe: "",
    gha: emptyDegMin(),
    sha: emptyDegMin(),
    v: emptySignedMinutes(),
    inc: emptyDegMin(),
    dec: { deg: "", min: "", hemisphere: "N" },
    d: emptySignedMinutes(),
    ie: emptySignedMinutes(),
    dip: "",
    tc: { sign: "-", min: "" },
    ac: "",
    ulc: "",
    arc: emptySignedMinutes(),
  };
}

export function emptySheet(): SheetInput {
  return {
    voyage: { date: "", speed: "", course: "", pressure: "", temperature: "" },
    bodies: [emptyBody(), emptyBody(), emptyBody()],
  };
}

/**
 * The worked example shipped with the original calculation sheet:
 * three sights (Venus, Nunki, Alkaid) taken on 2016-10-18 in the North Atlantic.
 */
export function sampleSheet(): SheetInput {
  const base = emptySheet();
  return {
    voyage: {
      date: "2016-10-18",
      speed: "10.0",
      course: "230",
      pressure: "1024",
      temperature: "24",
    },
    bodies: [
      {
        ...base.bodies[0],
        name: "Venus",
        time: { h: "20", m: "45", s: "00" },
        lat: { deg: "34", min: "00.0", hemisphere: "N" },
        lon: { deg: "045", min: "00.0", hemisphere: "W" },
        hs: { deg: "13", min: "32.2" },
        hoe: "20.0",
        gha: { deg: "089", min: "28.9" },
        sha: { deg: "", min: "" },
        v: { sign: "-", min: "00.5" },
        inc: { deg: "11", min: "15.0" },
        dec: { deg: "21", min: "22.8", hemisphere: "S" },
        d: { sign: "+", min: "00.5" },
        ie: { sign: "+", min: "00.0" },
        dip: "07.9",
        tc: { sign: "-", min: "04.0" },
        ac: "00.1",
        ulc: "",
        arc: { sign: "+", min: "" },
      },
      {
        ...base.bodies[1],
        name: "Nunki",
        time: { h: "20", m: "48", s: "00" },
        lat: { deg: "33", min: "59.7", hemisphere: "N" },
        lon: { deg: "045", min: "00.5", hemisphere: "W" },
        hs: { deg: "29", min: "01.7" },
        hoe: "20.0",
        gha: { deg: "327", min: "44.0" },
        sha: { deg: "075", min: "55.7" },
        v: { sign: "+", min: "" },
        inc: { deg: "12", min: "02.0" },
        dec: { deg: "26", min: "16.4", hemisphere: "S" },
        d: { sign: "+", min: "" },
        ie: { sign: "+", min: "00.0" },
        dip: "07.9",
        tc: { sign: "-", min: "01.8" },
        ac: "",
        ulc: "",
        arc: { sign: "+", min: "" },
      },
      {
        ...base.bodies[2],
        name: "Alkaid",
        time: { h: "20", m: "50", s: "30" },
        lat: { deg: "33", min: "59.4", hemisphere: "N" },
        lon: { deg: "045", min: "00.8", hemisphere: "W" },
        hs: { deg: "26", min: "14.1" },
        hoe: "20.0",
        gha: { deg: "327", min: "44.0" },
        sha: { deg: "152", min: "57.7" },
        v: { sign: "+", min: "" },
        inc: { deg: "12", min: "39.6" },
        dec: { deg: "49", min: "14.0", hemisphere: "N" },
        d: { sign: "+", min: "" },
        ie: { sign: "+", min: "00.0" },
        dip: "07.9",
        tc: { sign: "-", min: "02.0" },
        ac: "",
        ulc: "",
        arc: { sign: "+", min: "" },
      },
    ],
  };
}
