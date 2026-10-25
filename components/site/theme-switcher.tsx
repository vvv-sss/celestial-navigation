"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import { useTheme } from "next-themes"

import { GRIDCN_THEMES } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const current = GRIDCN_THEMES.find((t) => t.value === theme) ?? GRIDCN_THEMES[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Choose colour theme">
          <Palette />
          <span className="hidden font-mono text-[10px] tracking-widest uppercase sm:inline">
            {mounted ? current.label : "Theme"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-primary/30">
        <DropdownMenuLabel className="font-mono text-[10px] tracking-widest text-foreground/50 uppercase">
          Gridcn theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {GRIDCN_THEMES.map((t) => (
            <DropdownMenuRadioItem key={t.value} value={t.value} className="font-mono text-xs">
              <span data-theme={t.value} className="mr-2 inline-block size-2.5 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]" />
              {t.label}
              <span className="ml-auto pl-4 text-[10px] text-foreground/40 uppercase">{t.hint}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
