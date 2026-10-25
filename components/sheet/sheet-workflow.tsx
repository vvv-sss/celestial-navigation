"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight, FlaskConical, RotateCcw } from "lucide-react"

import { reduceBody } from "@/lib/celestial"
import { isBodyBlank, STEP_IDS, useSheetStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Stepper } from "@/components/thegridcn/stepper"
import { StatusBar } from "@/components/thegridcn/status-bar"
import { AlmanacStep, CorrectionsStep, SightsStep, type BodyView } from "@/components/sheet/steps"
import { ResultsStep } from "@/components/sheet/results-step"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    id: "sights",
    label: "Sights",
    description: "Time, EP, sextant altitude",
    title: "Record the sights",
    blurb:
      "For each body note the UTC time, the estimated position at that time, the sextant altitude and your height of eye. Leave a body blank if you only have one or two sights.",
  },
  {
    id: "almanac",
    label: "Almanac",
    description: "Hour angle & declination",
    title: "Enter the almanac figures",
    blurb:
      "Open the Nautical Almanac at the date and whole hour of UTC. GHA, SHA (stars), v and d corrections and the increment combine into the local hour angle and declination.",
  },
  {
    id: "corrections",
    label: "Corrections",
    description: "From Hs to true altitude",
    title: "Correct the sextant altitude",
    blurb:
      "Apply index error, dip, refraction and the body-specific corrections. The sheet suggests dip and refraction from your figures; table values take precedence.",
  },
  {
    id: "results",
    label: "Results",
    description: "Intercepts & fix",
    title: "Intercepts, azimuths and fix",
    blurb:
      "Each sight gives an intercept and azimuth to plot a line of position. The lines are advanced for the run between sights and crossed for a fix.",
  },
] as const

export function SheetWorkflow() {
  const hydrated = useHydrated()
  const sheet = useSheetStore((s) => s.sheet)
  const step = useSheetStore((s) => s.step)
  const setStep = useSheetStore((s) => s.setStep)
  const loadSample = useSheetStore((s) => s.loadSample)
  const reset = useSheetStore((s) => s.reset)
  const revision = useSheetStore((s) => s.revision)

  const bodies: BodyView[] = React.useMemo(
    () =>
      sheet.bodies.map((input, index) => ({
        index,
        input,
        reduction: reduceBody(input),
        active: !isBodyBlank(input),
      })),
    [sheet.bodies]
  )

  const active = bodies.filter((b) => b.active)
  const stageValid = (stage: "sights" | "almanac" | "corrections") =>
    active.length > 0 && active.every((b) => b.reduction.valid[stage])
  const validity = [stageValid("sights"), stageValid("almanac"), stageValid("corrections"), true]

  // A step can be opened when every step before it is valid.
  const reachable = STEPS.map((_, i) => validity.slice(0, i).every(Boolean))
  const maxReachable = reachable.lastIndexOf(true)
  const current = Math.min(step, maxReachable)

  React.useEffect(() => {
    if (hydrated && current !== step) setStep(current)
  }, [hydrated, current, step, setStep])

  function goTo(next: number) {
    setStep(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const stepperRef = React.useRef<HTMLDivElement>(null)
  function onStepperClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = stepperRef.current?.getBoundingClientRect()
    if (!rect) return
    const i = Math.floor(((e.clientX - rect.left) / rect.width) * STEPS.length)
    if (reachable[i]) goTo(i)
  }

  const activeCount = active.length
  const completeCount = active.filter((b) => b.reduction.valid[STEP_IDS[Math.min(current, 2)] as "sights"]).length
  const canProceed = current < STEPS.length - 1 && validity[current]
  const info = STEPS[current]

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-10 font-mono text-xs tracking-widest text-foreground/40 uppercase">
        Loading sheet…
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 px-4 pb-16 pt-6 sm:px-6">
      {/* Progress */}
      <div ref={stepperRef} onClick={onStepperClick} className="cursor-pointer">
        <Stepper
          steps={STEPS.map((s) => ({ label: s.label, description: s.description }))}
          currentStep={current}
        />
      </div>

      {/* Title + actions */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
            Step {current + 1} of {STEPS.length}
          </div>
          <h1 className="font-heading text-xl font-bold tracking-wider text-glow sm:text-2xl">{info.title}</h1>
          <p className="mt-1 max-w-3xl text-sm text-foreground/60">{info.blurb}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={loadSample} title="Fill the sheet with the worked example">
            <FlaskConical /> Worked example
          </Button>
          <ResetDialog onConfirm={reset} />
        </div>
      </div>

      {/* Step content; the key remounts inputs after reset / sample load */}
      <div key={`${current}-${revision}`}>
        {current === 0 && <SightsStep bodies={bodies} />}
        {current === 1 && <AlmanacStep bodies={bodies} />}
        {current === 2 && <CorrectionsStep bodies={bodies} />}
        {current === 3 && <ResultsStep bodies={bodies} />}
      </div>

      {/* Navigation */}
      <StatusBar
        variant={validity[current] ? "info" : "default"}
        className="rounded border"
        leftContent={
          <span className="normal-case tracking-normal">
            {current < 3
              ? activeCount === 0
                ? "Enter at least one body to continue"
                : `${completeCount} of ${activeCount} ${activeCount === 1 ? "body" : "bodies"} ready`
              : `${activeCount} ${activeCount === 1 ? "sight" : "sights"} reduced`}
          </span>
        }
        rightContent={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={current === 0} onClick={() => goTo(current - 1)}>
              <ArrowLeft /> Back
            </Button>
            {current < STEPS.length - 1 ? (
              <Button
                size="sm"
                disabled={!canProceed}
                onClick={() => goTo(current + 1)}
                className={cn(canProceed && "shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.35)]")}
              >
                {current === 2 ? "Show results" : "Next"} <ArrowRight />
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={() => goTo(0)}>
                Review sights
              </Button>
            )}
          </div>
        }
      />
    </div>
  )
}

function ResetDialog({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" title="Clear every field">
          <RotateCcw /> Reset
        </Button>
      </DialogTrigger>
      <DialogContent className="border-primary/30">
        <DialogHeader>
          <DialogTitle className="font-heading tracking-wider">Reset the sheet?</DialogTitle>
          <DialogDescription>Every entered figure will be cleared. This cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Keep my data
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm()
              setOpen(false)
            }}
          >
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/** The store is persisted in localStorage; wait for it before rendering to avoid a hydration mismatch. */
function useHydrated() {
  const [hydrated, setHydrated] = React.useState(false)
  React.useEffect(() => {
    const unsub = useSheetStore.persist.onFinishHydration(() => setHydrated(true))
    void useSheetStore.persist.rehydrate()
    return unsub
  }, [])
  return hydrated
}
