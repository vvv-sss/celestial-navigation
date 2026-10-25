import Link from "next/link"
import { ArrowRight, Compass, Crosshair, Ruler, Sigma } from "lucide-react"

import { formatDegrees, formatDM, reduceBody, sampleSheet } from "@/lib/celestial"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/thegridcn/badge"
import { FeatureCard } from "@/components/thegridcn/feature-card"
import { GridScanOverlay } from "@/components/thegridcn/grid-scan-overlay"
import { HUDCornerFrame } from "@/components/thegridcn/hud-corner-frame"
import { Terminal } from "@/components/thegridcn/terminal"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { LoadSampleButton } from "@/components/site/load-sample-button"
import { HomeCta } from "@/components/site/home-cta"

const STEPS = [
  {
    icon: <Compass className="size-5" />,
    title: "1 · Sights",
    description: "Log each body's UTC time, estimated position, sextant altitude and height of eye.",
  },
  {
    icon: <Sigma className="size-5" />,
    title: "2 · Almanac",
    description: "Enter GHA, SHA, v and d corrections and the increment. LHA and declination are worked out as you type.",
  },
  {
    icon: <Ruler className="size-5" />,
    title: "3 · Corrections",
    description: "Index error, dip, refraction and body corrections turn the sextant reading into a true altitude.",
  },
  {
    icon: <Crosshair className="size-5" />,
    title: "4 · Fix",
    description: "Intercepts and azimuths become lines of position, advanced for the run and crossed for a fix.",
  },
]

export default function HomePage() {
  // The worked example is reduced at build time for the demo terminal.
  const demo = sampleSheet().bodies.map(reduceBody)
  const lines = [
    { text: "reduce --method intercept --bodies 3", type: "input" as const },
    ...demo.flatMap((r) => [
      { text: `${r.name.padEnd(7)} Hc ${formatDM(r.hc!)}  Zn ${formatDegrees(r.zn!)}  a ${r.intercept! >= 0 ? "+" : "−"}${Math.abs(r.intercept!).toFixed(1)} nm`, type: "output" as const },
    ]),
    { text: "3 lines of position · run advanced · fix plotted", type: "system" as const },
  ]

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-primary/20">
          <GridScanOverlay gridSize={80} scanSpeed={10} />
          <HUDCornerFrame position="top-left" size={48} className="m-4" />
          <HUDCornerFrame position="top-right" size={48} className="m-4" />
          <HUDCornerFrame position="bottom-left" size={48} className="m-4" />
          <HUDCornerFrame position="bottom-right" size={48} className="m-4" />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
            <div className="space-y-6">
              <Badge dot pulse size="md">
                Guided sight reduction
              </Badge>
              <h1 className="font-heading text-3xl font-bold leading-tight tracking-wider text-glow sm:text-4xl lg:text-5xl">
                Fix the vessel&apos;s position from stars &amp; planets
              </h1>
              <p className="max-w-xl text-base text-foreground/70 sm:text-lg">
                A calculation sheet that keeps the navigator in the loop. You take the figures from the sextant and the
                Nautical Almanac; the sheet does the spherical trigonometry, shows every intermediate value and plots the
                fix.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="shadow-[0_0_16px_rgba(var(--primary-rgb,0,180,255),0.35)]">
                  <Link href="/sheet/">
                    Open the calculation sheet <ArrowRight />
                  </Link>
                </Button>
                <LoadSampleButton />
              </div>
              <dl className="grid max-w-xl grid-cols-3 gap-4 border-t border-primary/15 pt-5 font-mono">
                <Metric label="Bodies per fix" value="3" />
                <Metric label="Steps" value="4" />
                <Metric label="Precision" value="0.1′" />
              </dl>
            </div>
            <Terminal title="worked example · 2016-10-18" lines={lines} className="lg:justify-self-end lg:w-full" />
          </div>
        </section>

        {/* Steps */}
        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">Workflow</div>
              <h2 className="font-heading text-xl font-bold tracking-wider sm:text-2xl">Four steps from sextant to fix</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <FeatureCard key={s.title} icon={s.icon} title={s.title} description={s.description} variant={i === 3 ? "highlight" : "default"} />
            ))}
          </div>
        </section>

        {/* Why */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6">
          <div className="grid gap-4 lg:grid-cols-3">
            <Why
              title="Manual, but not tedious"
              body="Fully manual sight reduction takes time and practice; software hides the method. This sheet sits in between: you supply every almanac and table value, and the arithmetic is done for you."
            />
            <Why
              title="Every value is visible"
              body="GHA, LHA, declination, calculated altitude, azimuth, each altitude correction and the intercept are shown as rows of the sheet, exactly as on a paper form."
            />
            <Why
              title="Checks as you type"
              body="Fields are validated against the almanac formats, suggestions for dip and refraction are offered from your height of eye and apparent altitude, and the fix warns about a weak angle of cut."
            />
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
          <HomeCta />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[9px] tracking-widest text-foreground/50 uppercase">{label}</dt>
      <dd className="text-xl font-bold text-primary">{value}</dd>
    </div>
  )
}

function Why({ title, body }: { title: string; body: string }) {
  return (
    <div className="relative rounded border border-primary/20 bg-card/50 p-5">
      <h3 className="font-heading text-sm font-bold tracking-wider">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/65">{body}</p>
    </div>
  )
}
