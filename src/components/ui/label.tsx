import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-xs leading-none font-semibold text-fg-1 select-none group-data-[disabled=true]/field:pointer-events-none group-data-[disabled=true]/field:text-fg-disabled peer-disabled:cursor-not-allowed peer-disabled:text-fg-disabled",
        className
      )}
      {...props}
    />
  )
}

export { Label }
