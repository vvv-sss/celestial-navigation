/**
 * Theory notes shown next to each row of the sight-reduction sheet.
 * Ported from the original calculation form and lightly edited.
 */
export interface GlossaryEntry {
  title: string
  body: string[]
}

export const GLOSSARY = {
  time: {
    title: "Time (UTC)",
    body: [
      "The exact time the sight was taken, in UTC. It is the entry point to the Nautical Almanac: the whole hour gives GHA and declination, the minutes and seconds give the increment.",
    ],
  },
  ep: {
    title: "Estimated position",
    body: [
      "The position you assume you are at for the time of the sight. Two ways to get it:",
      "Method 1 — run your last known position along the course for the distance logged since.",
      "Method 2 — pick a nearby position if you already roughly know where you are.",
      "The intercept is measured from this position, so each sight uses the EP for its own time.",
    ],
  },
  hs: {
    title: "Sextant altitude (Hs)",
    body: ["The altitude of the body as read off the sextant, before any correction."],
  },
  hoe: {
    title: "Height of eye",
    body: [
      "Height of the observer's eye above sea level in metres. It determines the dip of the sea horizon.",
    ],
  },
  gha: {
    title: "Greenwich hour angle (GHA)",
    body: [
      "The angle between the Greenwich meridian and the meridian of the body, measured westward 0°–360°. It is the celestial equivalent of longitude.",
      "Take it from the Almanac daily pages for the date and the whole hour of UTC. For a star use the GHA of Aries.",
    ],
  },
  sha: {
    title: "Sidereal hour angle (SHA)",
    body: [
      "Stars hardly move relative to each other, so the Almanac only tabulates the GHA of the First Point of Aries and lists each star's SHA, its angle west of Aries.",
      "GHA(star) = GHA(Aries) + SHA(star). Leave this row blank for planets.",
    ],
  },
  v: {
    title: "v correction",
    body: [
      "Planets and the Moon do not move at the standard rate used by the increment table. The v value printed at the foot of the daily page is entered into the Increments and Corrections table to get this correction.",
      "It is added when the GHA is increasing faster than standard; for Venus it can be negative.",
    ],
  },
  inc: {
    title: "Increment",
    body: [
      "The change in GHA for the minutes and seconds of UTC, from the Increments and Corrections table.",
    ],
  },
  ghaBody: {
    title: "GHA of the body",
    body: ["GHA (+ SHA for a star) ± v + increment, kept within 0°–360°."],
  },
  lon: {
    title: "Longitude",
    body: [
      "East longitude is added to the GHA, west longitude is subtracted.",
      "If the result exceeds 360° subtract 360°; if it is negative add 360°.",
    ],
  },
  lha: {
    title: "Local hour angle (LHA)",
    body: [
      "The angle between the observer's meridian and the meridian of the body, measured westward.",
      "LHA = GHA ± longitude (E +, W −). A body with LHA under 180° is west of you, over 180° it is east.",
    ],
  },
  dec: {
    title: "Declination",
    body: [
      "The angular distance of the body north or south of the celestial equator, the equivalent of latitude. Take it from the daily page for the whole hour of UTC.",
    ],
  },
  d: {
    title: "d correction",
    body: [
      "The hourly change in declination (d) printed at the foot of the daily page is entered into the Increments and Corrections table.",
      "Add it when declination is increasing between this hour and the next, subtract when decreasing.",
    ],
  },
  hc: {
    title: "Calculated altitude (Hc)",
    body: [
      "sin Hc = sin Lat · sin Dec + cos Lat · cos Dec · cos LHA",
      "Latitude and declination are signed: north positive, south negative. When they share a name the second term is effectively added, when they are contrary it is subtracted.",
    ],
  },
  zn: {
    title: "Azimuth",
    body: [
      "tan Z = sin LHA / (cos Lat · tan Dec − sin Lat · cos LHA), resolved with atan2 so every quadrant is handled.",
      "The quadrantal form reads from the pole towards east or west: N 47.7° E, S 52.3° W.",
      "Conversion to true: N Az E = Az; S Az E = 180 − Az; S Az W = 180 + Az; N Az W = 360 − Az.",
    ],
  },
  ie: {
    title: "Index error",
    body: [
      "The known error of your sextant.",
      "On the arc: subtract it from the sextant altitude. Off the arc: add it.",
    ],
  },
  dip: {
    title: "Dip",
    body: [
      "The correction for the height of eye, from the Altitude Correction Tables (Norie's or the Almanac), entered with your height of eye. Always subtracted.",
      "The suggested value is 1.76 √(height in metres).",
    ],
  },
  tc: {
    title: "Total correction (refraction)",
    body: [
      "The refraction correction for stars and planets from the Altitude Correction Tables, entered with the apparent altitude. Always subtracted.",
      "The suggested value uses Bennett's formula for a standard atmosphere.",
    ],
  },
  ac: {
    title: "Additional correction",
    body: [
      "Parallax correction for Venus, Mars and the Moon from the Altitude Correction Tables, entered with the apparent altitude. Added.",
    ],
  },
  ulc: {
    title: "Upper limb correction",
    body: ["For the Moon only: subtract 30′ when the upper limb was observed."],
  },
  arc: {
    title: "Non-standard conditions",
    body: [
      "Additional refraction correction for pressure and temperature that differ from the standard atmosphere, from the Altitude Correction Tables entered with your pressure and temperature.",
    ],
  },
  intercept: {
    title: "Intercept",
    body: [
      "Intercept = true altitude − calculated altitude, in minutes of arc = nautical miles.",
      "Positive: the position line lies towards the body from the EP. Negative: away from it.",
    ],
  },
  fix: {
    title: "Fix",
    body: [
      "Each sight gives a line of position perpendicular to the azimuth, through the point that lies the intercept distance from the EP towards or away from the body.",
      "Earlier lines are advanced along the course for the distance run to the time of the last sight, and the fix is the point closest to all lines (the centre of the cocked hat).",
    ],
  },
} satisfies Record<string, GlossaryEntry>

export type GlossaryKey = keyof typeof GLOSSARY
