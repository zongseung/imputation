import { Database } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium text-foreground tracking-tight">
              ImputeX
            </span>
            <span className="text-xs text-muted-foreground">
              Data Imputation
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <span className="text-xs text-muted-foreground">System Online</span>
          </div>
        </div>
      </div>
    </header>
  )
}
