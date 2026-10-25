"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/** The six Gridcn colour schemes, applied through `data-theme` on <html>. */
export const GRIDCN_THEMES = [
  { value: "tron", label: "Tron", hint: "cyan" },
  { value: "poseidon", label: "Poseidon", hint: "blue" },
  { value: "athena", label: "Athena", hint: "gold" },
  { value: "clu", label: "Clu", hint: "orange" },
  { value: "ares", label: "Ares", hint: "red" },
  { value: "aphrodite", label: "Aphrodite", hint: "pink" },
] as const

export type GridcnTheme = (typeof GRIDCN_THEMES)[number]["value"]

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="tron"
      themes={GRIDCN_THEMES.map((t) => t.value)}
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
