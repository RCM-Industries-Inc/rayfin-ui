import { useState } from 'react';
import {
  type ColumnDef,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Shown when there are no rows. */
  emptyMessage?: string;
}

/**
 * RCM DataTable — a themed, client-sorted table built on @tanstack/react-table
 * and the shadcn Table primitive. Pass column definitions and data; sortable
 * columns (the default for accessor columns) get a clickable header.
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
    <div className="overflow-hidden rounded-sm border border-border bg-card shadow-[var(--shadow-card)]">
      <Table className="tabular-nums">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={isNumericColumn(header.column.id) ? 'text-right' : undefined}
                  data-numeric={isNumericColumn(header.column.id) || undefined}
                >
                  {header.isPlaceholder ? null : header.column.getCanSort() ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${isNumericColumn(header.column.id) ? 'ml-auto' : '-ml-2'} h-7 rounded-sm px-2 text-[10.5px] font-semibold text-[var(--rcm-table-header-foreground)] hover:bg-[var(--rcm-table-header-hover)] hover:text-[var(--rcm-table-header-foreground)] focus-visible:ring-[var(--rcm-table-header-foreground)]`}
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
                    className={typeof cell.getValue() === 'number' ? 'text-right' : undefined}
                    data-numeric={typeof cell.getValue() === 'number' || undefined}
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
