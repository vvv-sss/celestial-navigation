"use client"

import { useRouter } from "next/navigation"
import { FlaskConical } from "lucide-react"

import { useSheetStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

export function LoadSampleButton({ variant = "outline" }: { variant?: "outline" | "ghost" }) {
  const router = useRouter()
  const loadSample = useSheetStore((s) => s.loadSample)
  return (
    <Button
      variant={variant}
      size="lg"
      onClick={async () => {
        await useSheetStore.persist.rehydrate()
        loadSample()
        router.push("/sheet/")
      }}
    >
      <FlaskConical /> Load worked example
    </Button>
  )
}
