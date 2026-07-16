import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap transition-colors duration-[var(--dur-1)] ease-[var(--ease-out)] focus-visible:ring-[3px] focus-visible:ring-[var(--rcm-focus-color)] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-deep-teal",
        secondary:
          "bg-tint-selected text-deep-teal [a]:hover:bg-tint-active",
        destructive:
          "bg-tint-bad text-[var(--rcm-bad-text)] [a]:hover:text-ink",
        good: "bg-tint-good text-[var(--rcm-good-text)]",
        neutral: "bg-tint-neutral text-ink",
        bad: "bg-tint-bad text-[var(--rcm-bad-text)]",
        outline:
          "border-border bg-card text-deep-teal [a]:hover:bg-tint-hover",
        ghost:
          "text-fg-2 hover:bg-tint-hover hover:text-deep-teal",
        link: "text-deep-teal hover:text-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
