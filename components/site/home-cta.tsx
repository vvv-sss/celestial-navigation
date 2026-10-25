"use client"

import { useRouter } from "next/navigation"

import { useSheetStore } from "@/lib/store"
import { CTABanner } from "@/components/thegridcn/cta-banner"

export function HomeCta() {
  const router = useRouter()
  const loadSample = useSheetStore((s) => s.loadSample)
  return (
    <CTABanner
      variant="highlight"
      title="Ready to take a sight?"
      description="Your figures stay in this browser between visits. Load the worked example to see the whole flow in a minute."
      primaryAction={{ label: "Start a new sheet", onClick: () => router.push("/sheet/") }}
      secondaryAction={{
        label: "Load worked example",
        onClick: async () => {
          await useSheetStore.persist.rehydrate()
          loadSample()
          router.push("/sheet/")
        },
      }}
    />
  )
}
