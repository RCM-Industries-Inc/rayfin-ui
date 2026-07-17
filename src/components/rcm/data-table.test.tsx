import { render, screen } from '@testing-library/react';
import type { ColumnDef } from '@tanstack/react-table';
import { describe, expect, it } from 'vitest';

import { DataTable } from '@/components/rcm/data-table';

interface TestRow {
  name: string;
  owner: string;
}

describe('DataTable layout', () => {
  it('stays within its container and applies declared column widths', () => {
    const columns: ColumnDef<TestRow>[] = [
      {
        accessorKey: 'name',
        header: 'Workflow',
        meta: { width: 260 },
        cell: ({ row }) => (
          <span className="block max-w-full truncate">{row.original.name}</span>
        ),
      },
      {
        accessorKey: 'owner',
        header: 'Owner',
      },
    ];

    render(
      <DataTable
        columns={columns}
        data={[
          {
            name: 'A workflow name long enough to require truncation inside a bounded column',
            owner: 'A similarly long owner name',
          },
        ]}
      />
    );

    expect(document.querySelector('[data-slot="data-table"]')).toHaveClass(
      'w-full',
      'max-w-full',
      'overflow-hidden'
    );
    expect(screen.getByRole('table')).toHaveClass('w-full', 'table-fixed');
    expect(screen.getByRole('columnheader', { name: /Workflow/ })).toHaveStyle({
      width: '260px',
    });
    expect(screen.getByText(/A workflow name long enough/)).toHaveClass(
      'max-w-full',
      'truncate'
    );
  });
});
