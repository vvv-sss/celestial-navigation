"use client"

import type * as React from "react"

import { Badge } from "@/components/thegridcn/badge"
import { HUDFrame } from "@/components/thegridcn/hud-frame"
import { InfoTip } from "@/components/sheet/info-tip"
import type { GlossaryKey } from "@/lib/glossary"
import { cn } from "@/lib/utils"

export type BodyStatus = "complete" | "incomplete" | "error" | "unused"

interface BodyCardProps {
  index: number
  name: string
  status: BodyStatus
  children: React.ReactNode
  className?: string
}

const STATUS_LABEL: Record<BodyStatus, { text: string; variant: "success" | "warning" | "danger" | "outline" }> = {
  complete: { text: "Ready", variant: "success" },
  incomplete: { text: "Incomplete", variant: "warning" },
  error: { text: "Check input", variant: "danger" },
  unused: { text: "Unused", variant: "outline" },
}

/** One column of the sight-reduction sheet: a HUD frame per celestial body. */
export function BodyCard({ index, name, status, children, className }: BodyCardProps) {
  const label = STATUS_LABEL[status]
  return (
    <HUDFrame
      label={`Body ${index + 1}`}
      className={cn("animate-sheet-in bg-card/40", status === "unused" && "opacity-70", className)}
    >
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-primary/15 pb-2">
        <h3 className="truncate font-heading text-sm font-bold tracking-wider text-foreground">
          {name || <span className="text-foreground/40">Unnamed body</span>}
        </h3>
        <Badge variant={label.variant} dot pulse={status === "incomplete"}>
          {label.text}
        </Badge>
      </div>
      <div className="divide-y divide-primary/10">{children}</div>
    </HUDFrame>
  )
}

interface RowProps {
  label: React.ReactNode
  tip?: GlossaryKey
  children: React.ReactNode
  error?: string
  /** Emphasise computed result rows. */
  result?: boolean
}

export function Row({ label, tip, children, error, result }: RowProps) {
  return (
    <div className={cn("py-1.5", result && "bg-primary/[0.04]")}>
      <div className="grid grid-cols-[minmax(0,7.5rem)_1fr] items-center gap-x-2">
        <div className="flex items-center gap-1 font-mono text-[10px] leading-tight tracking-wider text-foreground/70 uppercase">
          <span className={cn(result && "text-primary/90")}>{label}</span>
          {tip ? <InfoTip tip={tip} /> : null}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
      {error ? (
        <p className="mt-1 pl-[7.5rem] font-mono text-[10px] text-red-400">{error}</p>
      ) : null}
    </div>
  )
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pt-3 first:pt-0">
      <div className="mb-1 font-mono text-[9px] tracking-[0.3em] text-primary/60 uppercase">{title}</div>
      <div className="divide-y divide-primary/10">{children}</div>
    </div>
  )
}
