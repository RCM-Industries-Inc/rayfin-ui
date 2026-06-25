import { type ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ModalProps {
  /** Heading shown in the dialog header. */
  title: string;
  /** Optional supporting line under the title. */
  subtitle?: string;
  /** Called when the user dismisses (ESC, overlay click, or close button). */
  onClose: () => void;
  children: ReactNode;
  /** Footer content, typically action buttons. */
  footer?: ReactNode;
  /** Override the content width / sizing (e.g. "sm:max-w-2xl"). */
  className?: string;
}

/**
 * RCM Modal — a convenience wrapper over the shadcn `Dialog` primitives that
 * keeps the ergonomic `title` / `subtitle` / `footer` API while delegating
 * focus-trapping, ESC handling, scroll-lock, and ARIA wiring to Radix.
 *
 * It renders open whenever mounted; control visibility by conditionally
 * rendering it (or lift to the underlying `Dialog` for trigger-based flows).
 */
export function Modal({
  title,
  subtitle,
  onClose,
  children,
  footer,
  className,
}: ModalProps) {
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className={cn('sm:max-w-lg', className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
        </DialogHeader>
        <div className="py-1">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
