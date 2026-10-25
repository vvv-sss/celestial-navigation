import { describe, expect, it } from "vitest"

import {
  computeFix,
  computedAltitude,
  degToDM,
  dipForHeight,
  formatDM,
  formatDegrees,
  normalize360,
  normalizeField,
  parseField,
  quadrantal,
  reduceBody,
  refractionForAltitude,
  sampleSheet,
  trueAzimuth,
} from "./index"

const sample = sampleSheet()

describe("angle formatting", () => {
  it("splits degrees and minutes with carry", () => {
    expect(degToDM(13.345)).toEqual({ deg: 13, min: 20.7, sign: 1 })
    expect(degToDM(12.99999)).toEqual({ deg: 13, min: 0, sign: 1 })
    expect(degToDM(-0.5)).toEqual({ deg: 0, min: 30, sign: -1 })
  })
  it("formats with padding", () => {
    expect(formatDM(55.7233, { degDigits: 3 })).toBe("055°43.4′")
    expect(formatDM(5.0167, { suffix: "N" })).toBe("05°01.0′ N")
    expect(formatDegrees(232.26)).toBe("232.3°")
  })
  it("normalises hour angles", () => {
    expect(normalize360(360)).toBe(0)
    expect(normalize360(-0.5)).toBe(359.5)
    expect(normalize360(359.9)).toBeCloseTo(359.9)
  })
})

describe("field parsing", () => {
  it("accepts lenient input and normalises it", () => {
    expect(normalizeField("minutes", "5")).toBe("05.0")
    expect(normalizeField("minutes", "5,3")).toBe("05.3")
    expect(normalizeField("deg360", "45")).toBe("045")
    expect(normalizeField("hoe", "20")).toBe("20.0")
    expect(normalizeField("hours", "7")).toBe("07")
  })
  it("rejects out-of-range or malformed values", () => {
    expect(parseField("minutes", "60").error).toMatch(/range/i)
    expect(parseField("deg90", "90").error).toMatch(/range/i)
    expect(parseField("deg90", "12.5").error).toMatch(/whole/i)
    expect(parseField("minutes", "abc").error).toBeDefined()
    expect(parseField("minutes", "").empty).toBe(true)
  })
})

describe("spherical triangle", () => {
  it("computes altitude and azimuth for the Venus sight", () => {
    const hc = computedAltitude(55.7236, -21.3883, 34)
    expect(formatDM(hc)).toBe("13°20.7′")
    const zn = trueAzimuth(55.7236, -21.3883, 34)
    expect(formatDegrees(zn)).toBe("232.3°")
    expect(quadrantal(zn)).toMatchObject({ ns: "S", ew: "W" })
  })
  it("handles the meridian and prime vertical without blowing up", () => {
    expect(trueAzimuth(0, 10, 50)).toBeCloseTo(180, 5) // body south on the meridian
    expect(trueAzimuth(0, 60, 50)).toBeCloseTo(0, 5) // body north on the meridian
    expect(trueAzimuth(180, 10, 50)).toBeCloseTo(0, 5) // lower transit, north
    expect(trueAzimuth(90, 0, 0)).toBeCloseTo(270, 5) // body setting due west on the equator
  })
  it("quadrant naming follows LHA", () => {
    expect(quadrantal(trueAzimuth(300, 20, 40))).toMatchObject({ ew: "E" })
    expect(quadrantal(trueAzimuth(60, 20, 40))).toMatchObject({ ew: "W" })
    expect(quadrantal(45)).toEqual({ ns: "N", angle: 45, ew: "E" })
    expect(quadrantal(135)).toEqual({ ns: "S", angle: 45, ew: "E" })
    expect(quadrantal(225)).toEqual({ ns: "S", angle: 45, ew: "W" })
    expect(quadrantal(315)).toEqual({ ns: "N", angle: 45, ew: "W" })
  })
})

describe("corrections", () => {
  it("suggests dip and refraction matching the tables", () => {
    expect(dipForHeight(20)).toBeCloseTo(7.9, 1)
    expect(refractionForAltitude(13.4)).toBeCloseTo(4.0, 0)
    expect(refractionForAltitude(28.9)).toBeCloseTo(1.8, 1)
    expect(refractionForAltitude(26.1)).toBeCloseTo(2.0, 1)
  })
})

describe("full reduction of the worked example", () => {
  const expected = [
    // name, GHA body, LHA, Dec, Hc, Zn, intercept
    ["Venus", "100°43.4′", "055°43.4′", "21°23.3′ S", "13°20.7′", "232.3°", -0.3],
    ["Nunki", "055°41.7′", "010°41.2′", "26°16.4′ S", "28°53.1′", "190.9°", -1.1],
    ["Alkaid", "133°21.3′", "088°20.5′", "49°14.0′ N", "26°02.7′", "313.4°", 1.5],
  ] as const

  it.each(expected)("%s", (name, gha, lha, dec, hc, zn, intercept) => {
    const body = sample.bodies.find((b) => b.name === name)!
    const r = reduceBody(body)
    expect(r.valid).toEqual({ sights: true, almanac: true, corrections: true })
    expect(formatDM(r.ghaBody!, { degDigits: 3 })).toBe(gha)
    expect(formatDM(r.lha!, { degDigits: 3 })).toBe(lha)
    expect(formatDM(Math.abs(r.dec!), { suffix: r.dec! < 0 ? "S" : "N" })).toBe(dec)
    expect(formatDM(r.hc!)).toBe(hc)
    expect(formatDegrees(r.zn!)).toBe(zn)
    expect(r.intercept!).toBeCloseTo(intercept, 0)
    expect(Math.abs(r.intercept! - intercept)).toBeLessThanOrEqual(0.15)
  })

  it("reports partial validity for an unfinished body", () => {
    const body = { ...sample.bodies[0], gha: { deg: "", min: "" } }
    const r = reduceBody(body)
    expect(r.valid.sights).toBe(true)
    expect(r.valid.almanac).toBe(false)
    expect(r.hc).toBeNull()
  })

  it("flags malformed entries", () => {
    const body = { ...sample.bodies[0], lat: { ...sample.bodies[0].lat, min: "61" } }
    const r = reduceBody(body)
    expect(r.errors["lat.min"]).toBeDefined()
    expect(r.valid.sights).toBe(false)
  })

  it("carries a d correction across the equator", () => {
    const body = {
      ...sample.bodies[0],
      dec: { deg: "00", min: "00.2", hemisphere: "S" as const },
      d: { sign: "-" as const, min: "00.5" },
    }
    // Dec 0°00.2′ S decreasing by 0.5′ ends up 0°00.3′ N
    expect(reduceBody(body).dec).toBeCloseTo(0.3 / 60, 6)
  })
})

describe("fix", () => {
  it("finds the crossing point of two perpendicular LOPs", () => {
    const r = computeFix([
      { label: "A", lat: 34, lon: -45, zn: 0, intercept: 2, timeSeconds: null },
      { label: "B", lat: 34, lon: -45, zn: 90, intercept: 3, timeSeconds: null },
    ])
    expect(r.fix).not.toBeNull()
    expect(r.fix!.y).toBeCloseTo(2, 6) // 2 nm north
    expect(r.fix!.x).toBeCloseTo(3, 6) // 3 nm east
    expect(r.fix!.lat).toBeCloseTo(34 + 2 / 60, 6)
  })

  it("advances earlier sights along the course", () => {
    const r = computeFix(
      [
        { label: "A", lat: 34, lon: -45, zn: 0, intercept: 0, timeSeconds: 0 },
        { label: "B", lat: 34, lon: -45, zn: 90, intercept: 0, timeSeconds: 3600 },
      ],
      { course: 0, speed: 10 }
    )
    expect(r.advanced).toBe(true)
    expect(r.lops[0].advancedAp.y).toBeCloseTo(10, 6)
    expect(r.fix!.y).toBeCloseTo(10, 6)
  })

  it("warns on parallel lines", () => {
    const r = computeFix([
      { label: "A", lat: 34, lon: -45, zn: 10, intercept: 1, timeSeconds: null },
      { label: "B", lat: 34, lon: -45, zn: 190, intercept: 1, timeSeconds: null },
    ])
    expect(r.fix).toBeNull()
    expect(r.warnings.length).toBeGreaterThan(0)
  })

  it("produces a tight cocked hat for the worked example", () => {
    const reduced = sample.bodies.map(reduceBody)
    const r = computeFix(
      reduced.map((b) => ({
        label: b.name,
        lat: b.lat!,
        lon: b.lon!,
        zn: b.zn!,
        intercept: b.intercept!,
        timeSeconds: b.timeSeconds,
      })),
      { course: 230, speed: 10 }
    )
    expect(r.fix).not.toBeNull()
    expect(r.advanced).toBe(true)
    // The fix is within a couple of miles of the EP
    expect(Math.hypot(r.fix!.x, r.fix!.y)).toBeLessThan(3)
  })
})
