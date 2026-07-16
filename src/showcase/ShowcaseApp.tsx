import { useState, type ReactNode } from 'react';
import { ChevronDown, Info } from 'lucide-react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Modal } from '@/components/rcm/modal';
import { DataTable } from '@/components/rcm/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import logoTeal from '@/assets/Logo_RCM_Teal.png';

type LoadRow = {
  load: string;
  supplier: string;
  weight: number;
  status: string;
};

const LOAD_ROWS: LoadRow[] = [
  { load: '#4471', supplier: 'Nucor Steel', weight: 42300, status: 'Received' },
  { load: '#4472', supplier: 'Ryerson', weight: 18900, status: 'Open' },
  { load: '#4473', supplier: 'Alro Steel', weight: 31250, status: 'Received' },
  { load: '#4474', supplier: 'Nucor Steel', weight: 9600, status: 'Open' },
];

const LOAD_COLUMNS: ColumnDef<LoadRow>[] = [
  { accessorKey: 'load', header: 'Load' },
  { accessorKey: 'supplier', header: 'Supplier' },
  {
    accessorKey: 'weight',
    header: 'Weight (lb)',
    cell: ({ row }) => (
      <span className="block text-right tabular-nums">{row.original.weight.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'Open' ? 'neutral' : 'good'}>
        {row.original.status}
      </Badge>
    ),
  },
];

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
        <h2 className="text-sm font-semibold text-fg-1">{title}</h2>
        {description && (
          <p className="text-[13px] text-fg-2">{description}</p>
        )}
      </div>
      <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">{children}</div>
    </section>
  );
}

const BRAND_SWATCHES: { name: string; className: string }[] = [
  { name: 'teal', className: 'bg-teal' },
  { name: 'deep-teal', className: 'bg-deep-teal' },
  { name: 'light-teal', className: 'bg-light-teal' },
  { name: 'aqua', className: 'bg-aqua' },
  { name: 'mint', className: 'bg-mint' },
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
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen bg-background text-fg-2">
        <header className="sticky top-0 z-10 border-b border-border bg-card">
          <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-6">
            <img src={logoTeal} alt="RCM Industries" className="h-9 w-auto shrink-0" />
            <div className="h-8 w-px shrink-0 bg-border" />
            <div className="min-w-0 leading-tight">
              <h1 className="text-xl font-semibold tracking-tight text-fg-1">Rayfin UI</h1>
              <p className="text-[13px] text-fg-2">
                RCM component library · shadcn/ui + Modern Teal
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl space-y-12 px-6 py-10">
          <Section
            title="Brand palette"
            description="One opaque light theme. Color encodes brand, division, sentiment, or severity—not decoration."
          >
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-6">
                {BRAND_SWATCHES.map((s) => (
                  <div key={s.name} className="space-y-1.5">
                    <div
                      className={`h-12 rounded-sm border ${s.className}`}
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
                      className={`flex h-12 items-center justify-center rounded-sm border ${s.className} ${s.fg}`}
                    >
                      <span className="text-xs font-semibold">Aa</span>
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

          <Section title="Status pills" description="Sentiment tint plus darkened text; status never depends on color alone.">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="good">Received</Badge>
              <Badge variant="neutral">Pending</Badge>
              <Badge variant="bad">Blocked</Badge>
              <Badge variant="secondary">Selected</Badge>
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

          <Section title="Card" description="Opaque white, 10px radius, hairline border, and layered ink elevation.">
            <Card interactive className="max-w-sm">
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

          <Section
            title="KPI callout"
            description="Category color is a 9px label swatch—not a tinted card or colored edge."
          >
            <Card interactive className="max-w-xs">
              <CardContent className="pt-3.5">
                <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-fg-2">
                  <span className="size-[9px] rounded-[2px] bg-teal" aria-hidden />
                  Open backlog
                </div>
                <div className="text-[30px] leading-none font-semibold text-deep-teal tabular-nums">
                  $2,418,930
                </div>
                <div className="mt-2 text-[11px] font-semibold text-good tabular-nums">
                  ▼ 4.2% <span className="font-normal text-fg-2">vs. prior week</span>
                </div>
              </CardContent>
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
            <div className="overflow-hidden rounded-sm border border-border shadow-[var(--shadow-card)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Load</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Weight</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold text-fg-1">#4471</TableCell>
                    <TableCell>Nucor Steel</TableCell>
                    <TableCell className="text-right">42,300 lbs</TableCell>
                    <TableCell>
                      <Badge variant="good">Received</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold text-fg-1">#4472</TableCell>
                    <TableCell>Ryerson</TableCell>
                    <TableCell className="text-right">18,900 lbs</TableCell>
                    <TableCell>
                      <Badge variant="neutral">Open</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
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

          <Section
            title="Popover"
            description="Anchored floating panel for inline controls."
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Columns</Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="space-y-2">
                <p className="text-xs font-semibold text-fg-1">
                  Visible columns
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <label className="flex items-center gap-2">
                    <Checkbox defaultChecked /> Supplier
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox defaultChecked /> Weight
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox /> PO number
                  </label>
                </div>
              </PopoverContent>
            </Popover>
          </Section>

          <Section
            title="Sheet"
            description="Slide-over panel for side content or forms."
          >
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open details</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Load #4471</SheetTitle>
                  <SheetDescription>
                    Nucor Steel · A36 Carbon · PO 88231
                  </SheetDescription>
                </SheetHeader>
                <div className="px-4 text-sm text-muted-foreground">
                  42,300 lbs received across 3 bundles.
                </div>
              </SheetContent>
            </Sheet>
          </Section>

          <Section
            title="Fields"
            description="Form field composition with labels and descriptions."
          >
            <FieldGroup className="max-w-md">
              <Field>
                <FieldLabel htmlFor="f-po">PO number</FieldLabel>
                <Input id="f-po" placeholder="121464" />
                <FieldDescription>
                  The purchase order this load bills against.
                </FieldDescription>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="f-rush" />
                <FieldLabel htmlFor="f-rush">Rush order</FieldLabel>
              </Field>
            </FieldGroup>
          </Section>

          <Section
            title="Data table"
            description="RCM composite over @tanstack/react-table — click a header to sort."
          >
            <DataTable columns={LOAD_COLUMNS} data={LOAD_ROWS} />
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
