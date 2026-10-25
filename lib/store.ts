"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

import {
  emptySheet,
  sampleSheet,
  type BodyInput,
  type SheetInput,
  type VoyageInput,
} from "@/lib/celestial"

export const STEP_IDS = ["sights", "almanac", "corrections", "results"] as const
export type StepId = (typeof STEP_IDS)[number]

/**
 * Dotted path into a BodyInput, e.g. "lat.deg", "v.sign", "hoe".
 * Kept as a string so the field components stay generic.
 */
export type BodyPath = string

interface SheetState {
  sheet: SheetInput
  step: number
  /** Incremented on reset / sample so inputs can remount. */
  revision: number
  setStep: (step: number) => void
  setVoyage: (patch: Partial<VoyageInput>) => void
  setBodyField: (index: number, path: BodyPath, value: string) => void
  loadSample: () => void
  reset: () => void
}

function setIn<T>(obj: T, path: string[], value: unknown): T {
  if (path.length === 0) return value as T
  const [head, ...rest] = path
  const record = obj as unknown as Record<string, unknown>
  return {
    ...record,
    [head]: setIn(record[head], rest, value),
  } as T
}

export const useSheetStore = create<SheetState>()(
  persist(
    (set) => ({
      sheet: emptySheet(),
      step: 0,
      revision: 0,
      setStep: (step) =>
        set({ step: Math.max(0, Math.min(STEP_IDS.length - 1, step)) }),
      setVoyage: (patch) =>
        set((s) => ({ sheet: { ...s.sheet, voyage: { ...s.sheet.voyage, ...patch } } })),
      setBodyField: (index, path, value) =>
        set((s) => {
          const bodies = [...s.sheet.bodies] as SheetInput["bodies"]
          bodies[index] = setIn<BodyInput>(bodies[index], path.split("."), value)
          return { sheet: { ...s.sheet, bodies } }
        }),
      loadSample: () =>
        set((s) => ({ sheet: sampleSheet(), step: 0, revision: s.revision + 1 })),
      reset: () =>
        set((s) => ({ sheet: emptySheet(), step: 0, revision: s.revision + 1 })),
    }),
    {
      name: "celestial-navigation-sheet-v1",
      version: 1,
      partialize: (s) => ({ sheet: s.sheet, step: s.step }),
      skipHydration: true,
    }
  )
)

/** True when nothing at all has been typed for this body. */
export function isBodyBlank(body: BodyInput): boolean {
  const walk = (v: unknown): boolean => {
    if (typeof v === "string") return v.trim() === ""
    if (v && typeof v === "object") return Object.values(v).every(walk)
    return true
  }
  return (
    body.name.trim() === "" &&
    walk(body.time) &&
    body.lat.deg === "" && body.lat.min === "" &&
    body.lon.deg === "" && body.lon.min === "" &&
    walk(body.hs) && body.hoe.trim() === "" &&
    walk(body.gha) && walk(body.sha) && body.v.min.trim() === "" &&
    walk(body.inc) && body.dec.deg === "" && body.dec.min === "" &&
    body.d.min.trim() === "" && body.ie.min.trim() === "" &&
    body.dip.trim() === "" && body.tc.min.trim() === "" &&
    body.ac.trim() === "" && body.ulc.trim() === "" && body.arc.min.trim() === ""
  )
}
