import type { Metadata, Viewport } from "next"
import { Geist_Mono, Orbitron, Rajdhani } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
})

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: {
    default: "Celestial Navigation · Sight Reduction",
    template: "%s · Celestial Navigation",
  },
  description:
    "Guided sight-reduction sheet: fix the vessel's position from stars and planets with the intercept method.",
  applicationName: "Celestial Navigation",
}

export const viewport: Viewport = {
  themeColor: "#070a12",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        rajdhani.variable,
        orbitron.variable,
        geistMono.variable
      )}
    >
      <body className="min-h-svh bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
