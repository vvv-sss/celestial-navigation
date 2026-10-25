"use client"

import { CircleHelp } from "lucide-react"

import { GLOSSARY, type GlossaryKey } from "@/lib/glossary"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface InfoTipProps {
  tip: GlossaryKey
  className?: string
}

/** Small "?" button that opens the theory note for a row of the sheet. */
export function InfoTip({ tip, className }: InfoTipProps) {
  const entry = GLOSSARY[tip]
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`About ${entry.title}`}
          className={cn(
            "inline-flex size-5 shrink-0 items-center justify-center rounded-full text-foreground/40 transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none",
            className
          )}
        >
          <CircleHelp className="size-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        className="w-80 border-primary/30 bg-card/95 p-0 backdrop-blur-sm"
      >
        <div className="border-b border-primary/20 px-4 py-2">
          <div className="font-mono text-[10px] tracking-widest text-primary uppercase">
            {entry.title}
          </div>
        </div>
        <div className="space-y-2 px-4 py-3 text-xs leading-relaxed text-foreground/80">
          {entry.body.map((p, i) => (
            <p key={i} className={cn(p.includes("=") && "font-mono text-[11px] text-primary/90")}>
              {p}
            </p>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
