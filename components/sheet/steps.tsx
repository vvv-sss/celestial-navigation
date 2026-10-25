"use client"

import * as React from "react"

import {
  formatDM,
  formatDegrees,
  formatLatitude,
  formatLongitude,
  type BodyInput,
  type BodyReduction,
  type EastWest,
  type Hemisphere,
  type PlusMinus,
} from "@/lib/celestial"
import { useSheetStore } from "@/lib/store"
import { BodyCard, Row, Section, type BodyStatus } from "@/components/sheet/body-card"
import {
  AngleInput,
  Computed,
  MinutesInput,
  NumInput,
  TimeInput,
  Unit,
} from "@/components/sheet/fields"
import { HUDFrame } from "@/components/thegridcn/hud-frame"

/* ------------------------------------------------------------------------ */
/* Shared                                                                   */
/* ------------------------------------------------------------------------ */

export interface BodyView {
  index: number
  input: BodyInput
  reduction: BodyReduction
  active: boolean
}

export function statusFor(view: BodyView, stage: keyof BodyReduction["valid"]): BodyStatus {
  if (!view.active) return "unused"
  if (Object.keys(view.reduction.errors).length > 0) return "error"
  return view.reduction.valid[stage] ? "complete" : "incomplete"
}

function useBodySetter(index: number) {
  const setBodyField = useSheetStore((s) => s.setBodyField)
  return React.useCallback(
    (path: string) => (value: string) => setBodyField(index, path, value),
    [index, setBodyField]
  )
}

function BodyGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 lg:grid-cols-3">{children}</div>
}

/* ------------------------------------------------------------------------ */
/* Step 1 · Sights                                                           */
/* ------------------------------------------------------------------------ */

export function VoyagePanel() {
  const voyage = useSheetStore((s) => s.sheet.voyage)
  const setVoyage = useSheetStore((s) => s.setVoyage)
  return (
    <HUDFrame label="Voyage data" className="bg-card/40">
      <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
        <Field label="Date (UTC)">
          <input
            type="date"
            aria-label="Date"
            value={voyage.date}
            onChange={(e) => setVoyage({ date: e.target.value })}
            className="sheet-input w-full text-left [color-scheme:dark]"
          />
        </Field>
        <Field label="Speed over ground">
          <NumInput kind="speed" value={voyage.speed} onChange={(v) => setVoyage({ speed: v })} label="Speed over ground" />
          <Unit>kn</Unit>
        </Field>
        <Field label="Course over ground">
          <NumInput kind="course" value={voyage.course} onChange={(v) => setVoyage({ course: v })} label="Course over ground" />
          <Unit>° T</Unit>
        </Field>
        <Field label="Pressure">
          <NumInput kind="pressure" value={voyage.pressure} onChange={(v) => setVoyage({ pressure: v })} label="Atmospheric pressure" />
          <Unit>hPa</Unit>
        </Field>
        <Field label="Temperature">
          <NumInput kind="temperature" value={voyage.temperature} onChange={(v) => setVoyage({ temperature: v })} label="Air temperature" />
          <Unit>°C</Unit>
        </Field>
      </div>
      <p className="mt-3 font-mono text-[10px] tracking-wider text-foreground/40 uppercase">
        Course and speed advance the earlier position lines to the time of the last sight. Pressure and temperature are
        used to look up the non-standard refraction correction.
      </p>
    </HUDFrame>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[9px] tracking-widest text-foreground/50 uppercase">{label}</span>
      <span className="flex items-center gap-1.5">{children}</span>
    </label>
  )
}

export function SightsStep({ bodies }: { bodies: BodyView[] }) {
  return (
    <div className="space-y-4">
      <VoyagePanel />
      <BodyGrid>
        {bodies.map((b) => (
          <SightsBody key={b.index} view={b} />
        ))}
      </BodyGrid>
    </div>
  )
}

function SightsBody({ view }: { view: BodyView }) {
  const { index, input, reduction } = view
  const set = useBodySetter(index)
  const e = reduction.errors
  return (
    <BodyCard index={index} name={input.name} status={statusFor(view, "sights")}>
      <Row label="Celestial body">
        <input
          type="text"
          aria-label={`Body ${index + 1} name`}
          placeholder="Venus, Nunki, Sun…"
          value={input.name}
          onChange={(ev) => set("name")(ev.target.value)}
          className="sheet-input w-full text-left"
        />
      </Row>
      <Row label="Time of sight" tip="time" error={e["time.h"] ?? e["time.m"] ?? e["time.s"]}>
        <TimeInput
          h={input.time.h}
          m={input.time.m}
          s={input.time.s}
          onChange={(part, v) => set(`time.${part}`)(v)}
          errors={{ h: e["time.h"], m: e["time.m"], s: e["time.s"] }}
        />
      </Row>
      <Row label="EP latitude" tip="ep" error={e["lat.deg"] ?? e["lat.min"]}>
        <AngleInput
          label="Latitude"
          degKind="deg90"
          deg={input.lat.deg}
          min={input.lat.min}
          onDeg={set("lat.deg")}
          onMin={set("lat.min")}
          degError={e["lat.deg"]}
          minError={e["lat.min"]}
          hemisphere={input.lat.hemisphere}
          hemisphereOptions={["N", "S"] as const}
          onHemisphere={(v) => set("lat.hemisphere")(v as Hemisphere)}
        />
      </Row>
      <Row label="EP longitude" error={e["lon.deg"] ?? e["lon.min"]}>
        <AngleInput
          label="Longitude"
          degKind="deg180"
          deg={input.lon.deg}
          min={input.lon.min}
          onDeg={set("lon.deg")}
          onMin={set("lon.min")}
          degError={e["lon.deg"]}
          minError={e["lon.min"]}
          hemisphere={input.lon.hemisphere}
          hemisphereOptions={["E", "W"] as const}
          onHemisphere={(v) => set("lon.hemisphere")(v as EastWest)}
        />
      </Row>
      <Row label="Sextant altitude Hs" tip="hs" error={e["hs.deg"] ?? e["hs.min"]}>
        <AngleInput
          label="Sextant altitude"
          degKind="deg90"
          deg={input.hs.deg}
          min={input.hs.min}
          onDeg={set("hs.deg")}
          onMin={set("hs.min")}
          degError={e["hs.deg"]}
          minError={e["hs.min"]}
        />
      </Row>
      <Row label="Height of eye" tip="hoe" error={e["hoe"]}>
        <div className="flex items-center gap-1">
          <NumInput kind="hoe" value={input.hoe} onChange={set("hoe")} label="Height of eye" error={e["hoe"]} />
          <Unit>m</Unit>
        </div>
      </Row>
    </BodyCard>
  )
}

/* ------------------------------------------------------------------------ */
/* Step 2 · Almanac                                                          */
/* ------------------------------------------------------------------------ */

export function AlmanacStep({ bodies }: { bodies: BodyView[] }) {
  return (
    <BodyGrid>
      {bodies.map((b) => (
        <AlmanacBody key={b.index} view={b} />
      ))}
    </BodyGrid>
  )
}

function AlmanacBody({ view }: { view: BodyView }) {
  const { index, input, reduction: r } = view
  const set = useBodySetter(index)
  const e = r.errors
  return (
    <BodyCard index={index} name={input.name} status={statusFor(view, "almanac")}>
      <Section title="Hour angle">
        <Row label="GHA (Aries for stars)" tip="gha" error={e["gha.deg"] ?? e["gha.min"]}>
          <AngleInput label="GHA" degKind="deg360" deg={input.gha.deg} min={input.gha.min} onDeg={set("gha.deg")} onMin={set("gha.min")} degError={e["gha.deg"]} minError={e["gha.min"]} />
        </Row>
        <Row label="+ SHA (stars only)" tip="sha" error={e["sha.deg"] ?? e["sha.min"]}>
          <AngleInput label="SHA" degKind="deg360" deg={input.sha.deg} min={input.sha.min} onDeg={set("sha.deg")} onMin={set("sha.min")} degError={e["sha.deg"]} minError={e["sha.min"]} />
        </Row>
        <Row label="± v (Moon / planets)" tip="v" error={e["v.min"]}>
          <MinutesInput label="v correction" value={input.v.min} onChange={set("v.min")} error={e["v.min"]} sign={input.v.sign} onSign={(s) => set("v.sign")(s as PlusMinus)} />
        </Row>
        <Row label="+ Increment" tip="inc" error={e["inc.deg"] ?? e["inc.min"]}>
          <AngleInput label="Increment" degKind="deg90" deg={input.inc.deg} min={input.inc.min} onDeg={set("inc.deg")} onMin={set("inc.min")} degError={e["inc.deg"]} minError={e["inc.min"]} />
        </Row>
        <Row label="= GHA body" tip="ghaBody" result>
          <Computed>{r.ghaBody !== null ? formatDM(r.ghaBody, { degDigits: 3 }) : "—"}</Computed>
        </Row>
        <Row label="± EP longitude" tip="lon" result>
          <Computed>{r.lon !== null ? formatLongitude(r.lon) : "—"}</Computed>
        </Row>
        <Row label="= LHA" tip="lha" result>
          <Computed highlight>{r.lha !== null ? formatDM(r.lha, { degDigits: 3 }) : "—"}</Computed>
        </Row>
      </Section>
      <Section title="Declination">
        <Row label="Declination" tip="dec" error={e["dec.deg"] ?? e["dec.min"]}>
          <AngleInput label="Declination" degKind="deg90" deg={input.dec.deg} min={input.dec.min} onDeg={set("dec.deg")} onMin={set("dec.min")} degError={e["dec.deg"]} minError={e["dec.min"]} hemisphere={input.dec.hemisphere} hemisphereOptions={["N", "S"] as const} onHemisphere={(v) => set("dec.hemisphere")(v as Hemisphere)} />
        </Row>
        <Row label="± d (Sun / Moon / planets)" tip="d" error={e["d.min"]}>
          <MinutesInput label="d correction" value={input.d.min} onChange={set("d.min")} error={e["d.min"]} sign={input.d.sign} onSign={(s) => set("d.sign")(s as PlusMinus)} />
        </Row>
        <Row label="= Declination" result>
          <Computed highlight>{r.dec !== null ? formatLatitude(r.dec) : "—"}</Computed>
        </Row>
      </Section>
    </BodyCard>
  )
}

/* ------------------------------------------------------------------------ */
/* Step 3 · Altitude corrections                                              */
/* ------------------------------------------------------------------------ */

export function CorrectionsStep({ bodies }: { bodies: BodyView[] }) {
  return (
    <BodyGrid>
      {bodies.map((b) => (
        <CorrectionsBody key={b.index} view={b} />
      ))}
    </BodyGrid>
  )
}

function CorrectionsBody({ view }: { view: BodyView }) {
  const { index, input, reduction: r } = view
  const set = useBodySetter(index)
  const e = r.errors
  return (
    <BodyCard index={index} name={input.name} status={statusFor(view, "corrections")}>
      <Section title="Observed altitude">
        <Row label="Sextant altitude Hs" tip="hs" result>
          <Computed>{r.hs !== null ? formatDM(r.hs) : "—"}</Computed>
        </Row>
        <Row label="± Index error" tip="ie" error={e["ie.min"]}>
          <MinutesInput label="Index error" value={input.ie.min} onChange={set("ie.min")} error={e["ie.min"]} sign={input.ie.sign} onSign={(s) => set("ie.sign")(s as PlusMinus)} />
        </Row>
        <Row label="= Observed Ho" result>
          <Computed>{r.ho !== null ? formatDM(r.ho) : "—"}</Computed>
        </Row>
        <Row label="− Dip" tip="dip" error={e["dip"]}>
          <MinutesInput
            label="Dip"
            value={input.dip}
            onChange={set("dip")}
            error={e["dip"]}
            suggestion={r.hints.dip !== null ? { value: r.hints.dip, title: "Dip for the height of eye (1.76 √h). Click to use." } : null}
          />
        </Row>
        <Row label="= Apparent Ha" result>
          <Computed>{r.ha !== null ? formatDM(r.ha) : "—"}</Computed>
        </Row>
      </Section>
      <Section title="True altitude">
        <Row label="± Total correction" tip="tc" error={e["tc.min"]}>
          <MinutesInput
            label="Total (refraction) correction"
            value={input.tc.min}
            onChange={set("tc.min")}
            error={e["tc.min"]}
            sign={input.tc.sign}
            onSign={(s) => set("tc.sign")(s as PlusMinus)}
            suggestion={r.hints.refraction !== null && Number.isFinite(r.hints.refraction) ? { value: r.hints.refraction, title: "Mean refraction for the apparent altitude (Bennett). Click to use; keep the sign negative." } : null}
          />
        </Row>
        <Row label="+ Additional (Venus / Mars / Moon)" tip="ac" error={e["ac"]}>
          <MinutesInput label="Additional correction" value={input.ac} onChange={set("ac")} error={e["ac"]} />
        </Row>
        <Row label="− Upper limb (Moon)" tip="ulc" error={e["ulc"]}>
          <MinutesInput label="Upper limb correction" value={input.ulc} onChange={set("ulc")} error={e["ulc"]} />
        </Row>
        <Row label="± Non-standard conditions" tip="arc" error={e["arc.min"]}>
          <MinutesInput label="Non-standard conditions correction" value={input.arc.min} onChange={set("arc.min")} error={e["arc.min"]} sign={input.arc.sign} onSign={(s) => set("arc.sign")(s as PlusMinus)} />
        </Row>
        <Row label="= True altitude Ho" result>
          <Computed highlight>{r.hoTrue !== null ? formatDM(r.hoTrue) : "—"}</Computed>
        </Row>
        <Row label="− Calculated Hc" tip="hc" result>
          <Computed>{r.hc !== null ? formatDM(r.hc) : "—"}</Computed>
        </Row>
        <Row label="= Intercept" tip="intercept" result>
          <Computed highlight>{r.intercept !== null ? interceptText(r.intercept) : "—"}</Computed>
        </Row>
      </Section>
    </BodyCard>
  )
}

export function interceptText(intercept: number): string {
  const abs = Math.abs(intercept).toFixed(1)
  if (Math.abs(intercept) < 0.05) return "0.0 nm"
  return `${abs} nm ${intercept > 0 ? "towards" : "away"}`
}

export function azimuthText(r: BodyReduction): string {
  if (r.zn === null || r.quadrant === null) return "—"
  const q = r.quadrant
  return `${formatDegrees(r.zn)} · ${q.ns} ${formatDegrees(q.angle, 2)} ${q.ew}`
}
