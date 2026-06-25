import { useState, type ReactNode } from 'react';
import { Moon, Sun, ChevronDown, Info } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { Modal } from '@/components/rcm/modal';

import { useTheme } from './useTheme';

/* ---- layout helpers ------------------------------------------------------ */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">{children}</div>
    </section>
  );
}

const BRAND_SWATCHES: { name: string; className: string }[] = [
  { name: 'teal', className: 'bg-teal' },
  { name: 'deep-teal', className: 'bg-deep-teal' },
  { name: 'light-teal', className: 'bg-light-teal' },
  { name: 'slate-blue', className: 'bg-slate-blue' },
  { name: 'amber', className: 'bg-amber' },
  { name: 'rose', className: 'bg-rose' },
  { name: 'good', className: 'bg-good' },
  { name: 'neutral', className: 'bg-neutral' },
  { name: 'bad', className: 'bg-bad' },
];

const SEMANTIC_SWATCHES: { name: string; className: string; fg: string }[] = [
  { name: 'background', className: 'bg-background', fg: 'text-foreground' },
  { name: 'card', className: 'bg-card', fg: 'text-card-foreground' },
  { name: 'primary', className: 'bg-primary', fg: 'text-primary-foreground' },
  {
    name: 'secondary',
    className: 'bg-secondary',
    fg: 'text-secondary-foreground',
  },
  { name: 'muted', className: 'bg-muted', fg: 'text-muted-foreground' },
  { name: 'accent', className: 'bg-accent', fg: 'text-accent-foreground' },
  {
    name: 'destructive',
    className: 'bg-destructive',
    fg: 'text-primary-foreground',
  },
];

/* ---- showcase ------------------------------------------------------------ */

export function ShowcaseApp() {
  const { theme, toggle } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight">Rayfin UI</h1>
              <p className="text-sm text-muted-foreground">
                RCM component library · shadcn/ui + Modern Teal
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggle}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-5xl space-y-12 px-6 py-10">
          <Section
            title="Brand palette"
            description="RCM accents stay constant across light/dark; surfaces and text invert."
          >
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
                {BRAND_SWATCHES.map((s) => (
                  <div key={s.name} className="space-y-1.5">
                    <div
                      className={`h-12 rounded-lg border ${s.className}`}
                      aria-hidden
                    />
                    <p className="text-center text-xs text-muted-foreground">
                      {s.name}
                    </p>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                {SEMANTIC_SWATCHES.map((s) => (
                  <div key={s.name} className="space-y-1.5">
                    <div
                      className={`flex h-12 items-center justify-center rounded-lg border ${s.className} ${s.fg}`}
                    >
                      <span className="text-xs font-medium">Aa</span>
                    </div>
                    <p className="text-center text-xs text-muted-foreground">
                      {s.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section
            title="Buttons"
            description="All variants and sizes, themed to RCM teal."
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </Section>

          <Section title="Badges">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </Section>

          <Section
            title="Form controls"
            description="Inputs, labels, selection, and toggles."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input id="supplier" placeholder="e.g. Nucor Steel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Metal grade</Label>
                <Select>
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="Select a grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a36">A36 Carbon</SelectItem>
                    <SelectItem value="304">304 Stainless</SelectItem>
                    <SelectItem value="6061">6061 Aluminum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Receiving notes…" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="inspected" />
                <Label htmlFor="inspected">Inspected on arrival</Label>
              </div>
            </div>
          </Section>

          <Section title="Card">
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Load #4471</CardTitle>
                <CardDescription>Nucor Steel · A36 Carbon</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                42,300 lbs received · 3 bundles · PO 88231
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">View</Button>
                <Button size="sm" variant="outline">
                  Link invoice
                </Button>
              </CardFooter>
            </Card>
          </Section>

          <Section title="Tabs">
            <Tabs defaultValue="open" className="max-w-md">
              <TabsList>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="received">Received</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
              </TabsList>
              <TabsContent
                value="open"
                className="pt-3 text-sm text-muted-foreground"
              >
                3 loads scheduled this week.
              </TabsContent>
              <TabsContent
                value="received"
                className="pt-3 text-sm text-muted-foreground"
              >
                12 loads received this month.
              </TabsContent>
              <TabsContent
                value="closed"
                className="pt-3 text-sm text-muted-foreground"
              >
                All reconciled loads.
              </TabsContent>
            </Tabs>
          </Section>

          <Section title="Table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Load</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">#4471</TableCell>
                  <TableCell>Nucor Steel</TableCell>
                  <TableCell>42,300 lbs</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Received</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#4472</TableCell>
                  <TableCell>Ryerson</TableCell>
                  <TableCell>18,900 lbs</TableCell>
                  <TableCell>
                    <Badge>Open</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          <Section
            title="Overlays & feedback"
            description="Dropdown, tooltip, the RCM Modal (built on Dialog), and toasts."
          >
            <div className="flex flex-wrap items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Actions <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Load #4471</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Link invoice</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Info">
                    <Info />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Weights are net of tare.</TooltipContent>
              </Tooltip>

              <Button onClick={() => setModalOpen(true)}>Open modal</Button>

              <Button
                variant="secondary"
                onClick={() =>
                  toast.success('Invoice linked', {
                    description: 'PO 88231 matched to load #4471.',
                  })
                }
              >
                Show toast
              </Button>
            </div>
          </Section>
        </main>

        {modalOpen && (
          <Modal
            title="Link invoice"
            subtitle="Match an AP invoice to this metal load."
            onClose={() => setModalOpen(false)}
            footer={
              <>
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setModalOpen(false);
                    toast.success('Invoice linked');
                  }}
                >
                  Link
                </Button>
              </>
            }
          >
            <div className="space-y-2">
              <Label htmlFor="invoice">Invoice number</Label>
              <Input id="invoice" placeholder="INV-00231" />
            </div>
          </Modal>
        )}

        <Toaster />
      </div>
    </TooltipProvider>
  );
}
