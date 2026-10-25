import type { Metadata } from "next"

import { SheetWorkflow } from "@/components/sheet/sheet-workflow"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export const metadata: Metadata = {
  title: "Calculation sheet",
  description: "Step-by-step sight reduction: sights, almanac, altitude corrections, intercepts and fix.",
}

export default function SheetPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <SheetWorkflow />
      </main>
      <SiteFooter />
    </div>
  )
}
