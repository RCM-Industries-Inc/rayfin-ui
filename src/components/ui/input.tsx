import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-sm border border-input bg-card px-2.5 py-1 text-[13px] text-fg-2 transition-[color,border-color,box-shadow] duration-[var(--dur-1)] ease-[var(--ease-out)] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs file:font-semibold file:text-fg-1 placeholder:text-fg-3 hover:border-primary focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-[var(--rcm-focus-color)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-border disabled:bg-card disabled:text-fg-disabled aria-invalid:border-destructive aria-invalid:ring-[var(--rcm-tint-bad)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
