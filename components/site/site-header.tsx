"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ThemeSwitcher } from "@/components/site/theme-switcher"
import { UplinkHeader } from "@/components/thegridcn/uplink-header"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/", label: "Overview", short: "Home" },
  { href: "/sheet/", label: "Calculation sheet", short: "Sheet" },
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 border-b border-primary/20 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Sextant className="size-7 text-primary" />
          <span className="font-heading text-sm font-bold tracking-[0.2em] text-foreground uppercase">
            Celestial<span className="text-primary">Nav</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.replace(/\/$/, ""))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors",
                  active ? "bg-primary/15 text-primary" : "text-foreground/60 hover:text-primary"
                )}
              >
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.short}</span>
              </Link>
            )
          })}
          <div className="ml-2">
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
      <UplinkHeader
        leftText="SIGHT REDUCTION // INTERCEPT METHOD"
        rightText={<UtcClock />}
        className="border-b-0"
      />
    </header>
  )
}

function UtcClock() {
  const [now, setNow] = React.useState<string | null>(null)
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date().toISOString().slice(11, 19)), 1000)
    return () => clearInterval(id)
  }, [])
  return <span suppressHydrationWarning>{now ? `UTC ${now}` : "UTC --:--:--"}</span>
}

export function Sextant({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M16 4 L6 26" />
      <path d="M16 4 L26 26" />
      <path d="M8 22 A10 10 0 0 0 24 22" />
      <path d="M10 25.5 A8 8 0 0 0 22 25.5" strokeOpacity="0.6" />
      <circle cx="16" cy="4" r="1.5" fill="currentColor" />
      <path d="M16 4 L16 16" strokeDasharray="2 2" />
      <circle cx="16" cy="16" r="2" />
    </svg>
  )
}
