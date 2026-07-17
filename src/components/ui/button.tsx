import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-xs font-semibold whitespace-nowrap transition-[color,background-color,border-color,box-shadow] duration-[var(--dur-1)] ease-[var(--ease-out)] outline-none select-none focus-visible:ring-[3px] focus-visible:ring-[var(--rcm-focus-color)] disabled:pointer-events-none disabled:border-border disabled:bg-transparent disabled:text-fg-disabled disabled:shadow-none aria-invalid:border-destructive aria-invalid:ring-[var(--rcm-tint-bad)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[var(--rcm-primary-hover)]",
        outline:
          "border-border bg-card text-accent-foreground hover:border-line-strong hover:bg-tint-hover hover:text-accent-foreground aria-expanded:border-line-strong aria-expanded:bg-tint-selected",
        secondary:
          "border-border bg-card text-accent-foreground hover:border-line-strong hover:bg-tint-hover aria-expanded:bg-tint-selected",
        ghost:
          "text-fg-2 hover:bg-tint-hover hover:text-accent-foreground aria-expanded:bg-tint-selected aria-expanded:text-accent-foreground",
        destructive:
          "bg-tint-bad text-[var(--rcm-bad-text)] hover:bg-tint-bad hover:text-[var(--rcm-ink)] focus-visible:ring-[var(--rcm-tint-bad)]",
        link: "text-accent-foreground hover:text-ink",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 px-2 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
