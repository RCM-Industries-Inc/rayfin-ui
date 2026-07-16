import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-sm border border-input bg-card px-2.5 py-2 text-[13px] text-fg-2 transition-[color,border-color,box-shadow] duration-[var(--dur-1)] ease-[var(--ease-out)] outline-none placeholder:text-fg-3 hover:border-primary focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-[var(--rcm-focus-color)] disabled:cursor-not-allowed disabled:border-border disabled:bg-card disabled:text-fg-disabled aria-invalid:border-destructive aria-invalid:ring-[var(--rcm-tint-bad)]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
