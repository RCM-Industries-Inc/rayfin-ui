import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="light"
    className="toaster group [&_[data-sonner-toast]]:duration-[var(--dur-2)]! [&_[data-sonner-toast]]:[transition-timing-function:var(--ease-out)]!"
    icons={{
      success: <CircleCheckIcon className="size-4" strokeWidth={1.5} />,
      info: <InfoIcon className="size-4" strokeWidth={1.5} />,
      warning: <TriangleAlertIcon className="size-4" strokeWidth={1.5} />,
      error: <OctagonXIcon className="size-4" strokeWidth={1.5} />,
      loading: <Loader2Icon className="size-4 animate-spin" strokeWidth={1.5} />,
    }}
    style={
      {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius-chip)",
      } as React.CSSProperties
    }
    toastOptions={{
      classNames: {
        toast: "cn-toast shadow-[var(--shadow-menu)]",
      },
    }}
    {...props}
  />
)

export { Toaster }
