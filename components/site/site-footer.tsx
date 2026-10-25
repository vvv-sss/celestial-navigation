import { Divider } from "@/components/thegridcn/divider"

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6">
      <Divider variant="circuit" className="mb-4" />
      <div className="flex flex-col gap-2 font-mono text-[10px] tracking-widest text-foreground/40 uppercase sm:flex-row sm:items-center sm:justify-between">
        <span>Celestial navigation · Marcq St Hilaire intercept method</span>
        <span>
          Built by Volodymyr Serbulenko · UI by{" "}
          <a href="https://thegridcn.com" className="text-primary/70 hover:text-primary" target="_blank" rel="noreferrer">
            The Gridcn
          </a>
        </span>
      </div>
    </footer>
  )
}
