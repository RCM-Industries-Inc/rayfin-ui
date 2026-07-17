import { useState } from 'react';
import {
  type ColumnDef,
  type RowData,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Fixed-layout width for this column. Numbers are rendered as pixels. */
    width?: number | string;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Shown when there are no rows. */
  emptyMessage?: string;
}

/**
 * RCM DataTable — a themed, client-sorted table built on @tanstack/react-table
 * and the shadcn Table primitive. Pass column definitions and data; sortable
 * columns (the default for accessor columns) get a clickable header. The table
 * is constrained to its container; use `meta.width` on a column and render
 * truncating cell content when a predictable width is needed.
 *
 * For server-side sorting/pagination or row selection, lift the table instance
 * by inlining `useReactTable` in your own component instead.
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage = 'No results.',
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const isNumericColumn = (columnId: string) =>
    table
      .getRowModel()
      .rows.some((row) => typeof row.getValue(columnId) === 'number');

  return (
    <div
      data-slot="data-table"
      className="w-full max-w-full overflow-hidden rounded-sm border border-border bg-card shadow-[var(--shadow-card)]"
    >
      <Table className="w-full table-fixed tabular-nums">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={isNumericColumn(header.column.id) ? 'overflow-hidden text-right' : 'overflow-hidden'}
                  data-numeric={isNumericColumn(header.column.id) || undefined}
                  style={
                    header.column.columnDef.meta?.width == null
                      ? undefined
                      : { width: header.column.columnDef.meta.width }
                  }
                >
                  {header.isPlaceholder ? null : header.column.getCanSort() ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${isNumericColumn(header.column.id) ? 'ml-auto' : '-ml-2'} h-7 max-w-full min-w-0 overflow-hidden rounded-sm px-2 text-[10.5px] font-semibold text-[var(--rcm-table-header-foreground)] hover:bg-[var(--rcm-table-header-hover)] hover:text-[var(--rcm-table-header-foreground)] focus-visible:ring-[var(--rcm-table-header-foreground)]`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <ArrowUpDown strokeWidth={1.5} />
                    </Button>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={typeof cell.getValue() === 'number' ? 'min-w-0 overflow-hidden text-right' : 'min-w-0 overflow-hidden'}
                    data-numeric={typeof cell.getValue() === 'number' || undefined}
                    style={
                      cell.column.columnDef.meta?.width == null
                        ? undefined
                        : { width: cell.column.columnDef.meta.width }
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
