"use client"

import * as React from "react"

import {
  computeFix,
  formatDM,
  formatDegrees,
  formatLatitude,
  formatLongitude,
  parseField,
  type SightForFix,
} from "@/lib/celestial"
import { useSheetStore } from "@/lib/store"
import { DataCard } from "@/components/thegridcn/data-card"
import { HUDFrame } from "@/components/thegridcn/hud-frame"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Stat } from "@/components/thegridcn/stat"
import { LopPlot } from "@/components/sheet/lop-plot"
import { InfoTip } from "@/components/sheet/info-tip"
import { azimuthText, interceptText, type BodyView } from "@/components/sheet/steps"

export function ResultsStep({ bodies }: { bodies: BodyView[] }) {
  const voyage = useSheetStore((s) => s.sheet.voyage)

  const reduced = bodies.filter(
    (b) => b.active && b.reduction.intercept !== null && b.reduction.zn !== null
  )

  const fix = React.useMemo(() => {
    const sights: SightForFix[] = reduced.map((b) => ({
      label: b.reduction.name || `Body ${b.index + 1}`,
      lat: b.reduction.lat!,
      lon: b.reduction.lon!,
      zn: b.reduction.zn!,
      intercept: b.reduction.intercept!,
      timeSeconds: b.reduction.timeSeconds,
    }))
    return computeFix(sights, {
      course: parseField("course", voyage.course).value,
      speed: parseField("speed", voyage.speed).value,
    })
  }, [reduced, voyage.course, voyage.speed])

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        {bodies.map((b) => {
          const r = b.reduction
          const complete = b.active && r.intercept !== null
          return (
            <DataCard
              key={b.index}
              className="animate-sheet-in"
              subtitle={`Body ${b.index + 1}${r.timeSeconds !== null ? ` · ${formatTime(r.timeSeconds)} UTC` : ""}`}
              title={r.name || (b.active ? "Unnamed body" : "Unused")}
              status={!b.active ? "inactive" : complete ? "active" : "alert"}
              fields={
                complete
                  ? [
                      { label: "EP", value: `${formatLatitude(r.lat!)}  ${formatLongitude(r.lon!)}` },
                      { label: "LHA / Dec", value: `${formatDM(r.lha!, { degDigits: 3 })}  ${formatLatitude(r.dec!)}` },
                      { label: "Calculated altitude Hc", value: formatDM(r.hc!) },
                      { label: "True altitude Ho", value: formatDM(r.hoTrue!) },
                      { label: "Azimuth Zn", value: azimuthText(r) },
                      { label: "Intercept", value: interceptText(r.intercept!), highlight: true },
                    ]
                  : [{ label: "Status", value: b.active ? "Incomplete — go back and finish this body" : "No data entered" }]
              }
            />
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <HUDFrame label="Position fix" className="bg-card/40">
          <div className="flex items-center gap-1 pb-3">
            <h3 className="font-heading text-sm font-bold tracking-wider">Fix at the last sight</h3>
            <InfoTip tip="fix" />
          </div>
          {fix.fix ? (
            <div className="space-y-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <Stat label="Latitude" value={formatLatitude(fix.fix.lat)} direction="neutral" />
                <Stat label="Longitude" value={formatLongitude(fix.fix.lon)} direction="neutral" />
              </div>
              <div className="flex flex-col gap-1 font-mono text-xs text-foreground/70">
                <div>
                  <span className="text-foreground/40">Reference EP </span>
                  {formatLatitude(fix.reference.lat)} {formatLongitude(fix.reference.lon)}
                </div>
                <div>
                  <span className="text-foreground/40">Offset from EP </span>
                  {Math.abs(fix.fix.y).toFixed(1)} nm {fix.fix.y >= 0 ? "N" : "S"} · {Math.abs(fix.fix.x).toFixed(1)} nm{" "}
                  {fix.fix.x >= 0 ? "E" : "W"}
                </div>
                <div>
                  <span className="text-foreground/40">Lines of position </span>
                  {fix.lops.length}
                  {fix.advanced ? " · earlier lines advanced for the run between sights" : " · not advanced"}
                </div>
              </div>
              <div className="divide-y divide-primary/10 border-t border-primary/10 pt-1 font-mono text-[11px]">
                {fix.lops.map((l, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-3 py-1 text-foreground/70">
                    <span className="truncate text-foreground">{l.label}</span>
                    <span>Zn {formatDegrees(l.zn)}</span>
                    <span>
                      {l.run > 0 ? `run ${l.run.toFixed(1)} nm · ` : ""}
                      a {l.intercept >= 0 ? "+" : "−"}
                      {Math.abs(l.intercept).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="font-mono text-xs text-foreground/60">
              Complete at least two bodies to obtain a fix.
            </p>
          )}
          {fix.warnings.length > 0 ? (
            <div className="mt-3 space-y-2">
              {fix.warnings.map((w) => (
                <Alert key={w} className="border-amber-500/40 bg-amber-500/5 text-amber-200">
                  <AlertDescription className="font-mono text-xs text-amber-200/90">{w}</AlertDescription>
                </Alert>
              ))}
            </div>
          ) : null}
        </HUDFrame>

        <HUDFrame label="Plot · north up · nautical miles" className="bg-card/40">
          {fix.lops.length > 0 ? (
            <LopPlot result={fix} className="mx-auto aspect-square w-full max-w-[28rem]" />
          ) : (
            <div className="flex aspect-square items-center justify-center font-mono text-xs text-foreground/40">
              No lines of position yet
            </div>
          )}
        </HUDFrame>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.round(seconds % 60)
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":")
}
