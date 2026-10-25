"use client"

import * as React from "react"

import type { FixResult } from "@/lib/celestial"

const SERIES = ["var(--chart-1)", "var(--chart-3)", "var(--chart-5)"]

interface LopPlotProps {
  result: FixResult
  className?: string
}

/**
 * Plot of the lines of position around the reference EP.
 * x east / y north in nautical miles, north up.
 */
export function LopPlot({ result, className }: LopPlotProps) {
  const { lops, fix } = result

  // Scale so that every AP, intercept foot and the fix fit with margin.
  const points = [
    { x: 0, y: 0 },
    ...lops.flatMap((l) => [l.ap, l.advancedAp, l.foot]),
    ...(fix ? [{ x: fix.x, y: fix.y }] : []),
  ]
  const extent = Math.max(2, ...points.map((p) => Math.max(Math.abs(p.x), Math.abs(p.y)))) * 1.35
  const size = 400
  const half = size / 2
  const k = half / extent // px per nm
  const sx = (x: number) => half + x * k
  const sy = (y: number) => half - y * k

  // Grid spacing: 1, 2, 5, 10 … nm
  const raw = extent / 3
  const mag = 10 ** Math.floor(Math.log10(raw))
  const gridStep = [1, 2, 5, 10].map((m) => m * mag).find((v) => v >= raw) ?? raw
  const gridLines: number[] = []
  for (let v = gridStep; v < extent; v += gridStep) gridLines.push(v, -v)

  const ids = React.useId()

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="Plot of the lines of position and the fix"
    >
      <defs>
        <clipPath id={`${ids}-clip`}>
          <rect x="0" y="0" width={size} height={size} />
        </clipPath>
      </defs>

      {/* Grid */}
      <rect x="0" y="0" width={size} height={size} fill="var(--card)" fillOpacity="0.5" />
      {gridLines.map((v) => (
        <g key={v} stroke="var(--primary)" strokeOpacity="0.12">
          <line x1={sx(v)} y1="0" x2={sx(v)} y2={size} />
          <line x1="0" y1={sy(v)} x2={size} y2={sy(v)} />
        </g>
      ))}
      <g stroke="var(--primary)" strokeOpacity="0.35">
        <line x1={half} y1="0" x2={half} y2={size} />
        <line x1="0" y1={half} x2={size} y2={half} />
      </g>
      <text x={half + 4} y="12" fill="var(--primary)" fontSize="10" fontFamily="var(--font-mono)">
        N
      </text>
      {/* Scale bar */}
      <g transform={`translate(12, ${size - 14})`}>
        <line x1="0" y1="0" x2={gridStep * k} y2="0" stroke="var(--foreground)" strokeOpacity="0.7" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="var(--foreground)" strokeOpacity="0.7" />
        <line x1={gridStep * k} y1="-3" x2={gridStep * k} y2="3" stroke="var(--foreground)" strokeOpacity="0.7" />
        <text x={gridStep * k + 4} y="3" fill="var(--foreground)" fillOpacity="0.7" fontSize="9" fontFamily="var(--font-mono)">
          {gridStep} nm
        </text>
      </g>

      <g clipPath={`url(#${ids}-clip)`}>
        {lops.map((lop, i) => {
          const color = SERIES[i % SERIES.length]
          const ux = Math.sin((lop.zn * Math.PI) / 180)
          const uy = Math.cos((lop.zn * Math.PI) / 180)
          // Direction along the LOP (perpendicular to the azimuth)
          const px = -uy
          const py = ux
          const L = extent * 3
          const a = { x: lop.foot.x + px * L, y: lop.foot.y + py * L }
          const b = { x: lop.foot.x - px * L, y: lop.foot.y - py * L }
          const arrowTip = { x: lop.foot.x + ux * extent * 0.18, y: lop.foot.y + uy * extent * 0.18 }
          return (
            <g key={lop.label + i}>
              {/* Run between sights */}
              {lop.run > 0 ? (
                <line
                  x1={sx(lop.ap.x)}
                  y1={sy(lop.ap.y)}
                  x2={sx(lop.advancedAp.x)}
                  y2={sy(lop.advancedAp.y)}
                  stroke={color}
                  strokeOpacity="0.5"
                  strokeDasharray="2 3"
                />
              ) : null}
              {/* Intercept from AP to the LOP */}
              <line
                x1={sx(lop.advancedAp.x)}
                y1={sy(lop.advancedAp.y)}
                x2={sx(lop.foot.x)}
                y2={sy(lop.foot.y)}
                stroke={color}
                strokeOpacity="0.8"
                strokeDasharray="4 3"
              />
              {/* Azimuth direction tick beyond the LOP */}
              <line
                x1={sx(lop.foot.x)}
                y1={sy(lop.foot.y)}
                x2={sx(arrowTip.x)}
                y2={sy(arrowTip.y)}
                stroke={color}
                strokeOpacity="0.35"
              />
              {/* Line of position */}
              <line
                x1={sx(a.x)}
                y1={sy(a.y)}
                x2={sx(b.x)}
                y2={sy(b.y)}
                stroke={color}
                strokeWidth="1.5"
                style={{ filter: `drop-shadow(0 0 3px ${color})` }}
              />
              {/* AP marker */}
              <circle cx={sx(lop.advancedAp.x)} cy={sy(lop.advancedAp.y)} r="3" fill="none" stroke={color} />
              {(() => {
                // Label sits on the LOP, 70% of the way to the edge, on whichever side has room.
                const d = extent * 0.7
                const cand = [
                  { x: lop.foot.x + px * d, y: lop.foot.y + py * d },
                  { x: lop.foot.x - px * d, y: lop.foot.y - py * d },
                ]
                const inside = (p: { x: number; y: number }) => Math.abs(p.x) < extent * 0.85 && Math.abs(p.y) < extent * 0.85
                const p = cand.find(inside) ?? cand[i % 2]
                const lx = Math.max(64, Math.min(size - 64, sx(p.x)))
                const ly = Math.max(14, Math.min(size - 24, sy(p.y) - 6))
                return (
                  <text x={lx} y={ly} fill={color} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">
                    {lop.label || `Body ${i + 1}`} · {lop.zn.toFixed(1)}°
                  </text>
                )
              })()}
            </g>
          )
        })}

        {/* Fix reticle */}
        {fix ? (
          <g transform={`translate(${sx(fix.x)}, ${sy(fix.y)})`}>
            <circle r="9" fill="none" stroke="var(--foreground)" strokeOpacity="0.9" />
            <circle r="2.5" fill="var(--foreground)" />
            <line x1="-14" y1="0" x2="-6" y2="0" stroke="var(--foreground)" />
            <line x1="6" y1="0" x2="14" y2="0" stroke="var(--foreground)" />
            <line x1="0" y1="-14" x2="0" y2="-6" stroke="var(--foreground)" />
            <line x1="0" y1="6" x2="0" y2="14" stroke="var(--foreground)" />
            <text x="16" y="4" fill="var(--foreground)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold">
              FIX
            </text>
          </g>
        ) : null}
      </g>
    </svg>
  )
}
