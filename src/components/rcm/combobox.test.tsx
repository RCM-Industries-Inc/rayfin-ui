import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  Combobox,
  type ComboboxOption,
} from '@/components/rcm/combobox';

const options: ComboboxOption[] = [
  { value: 'P-1001', label: 'P-1001', description: 'Housing' },
  { value: 'P-2002', label: 'P-2002', description: 'Bracket' },
  { value: 'X-3003', label: 'X-3003', description: 'Cover' },
];

function ControlledCombobox({
  initialValue = '',
  onChange = vi.fn(),
}: {
  initialValue?: string;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  return (
    <Combobox
      aria-label="Product"
      options={options}
      value={value}
      onValueChange={(next) => {
        setValue(next);
        onChange(next);
      }}
    />
  );
}

describe('Combobox', () => {
  it('opens the complete dropdown for an existing selection', async () => {
    const user = userEvent.setup();
    render(<ControlledCombobox initialValue="P-1001" />);

    await user.click(screen.getByRole('combobox', { name: 'Product' }));

    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(screen.getByRole('option', { name: /P-1001.*Housing/ })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('filters reference options by description and selects with the keyboard', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ControlledCombobox onChange={onChange} />);

    const input = screen.getByRole('combobox', { name: 'Product' });
    await user.click(input);
    expect(screen.getAllByRole('option')).toHaveLength(3);

    await user.type(input, 'brack');
    expect(screen.getByRole('option', { name: /P-2002.*Bracket/ })).toBeVisible();
    expect(screen.queryByRole('option', { name: /P-1001/ })).not.toBeInTheDocument();

    await user.keyboard('{Enter}');
    expect(input).toHaveValue('P-2002');
    expect(onChange).toHaveBeenLastCalledWith('P-2002');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('accepts an exact typed value but rejects unknown reference values', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ControlledCombobox onChange={onChange} />);

    const input = screen.getByRole('combobox', { name: 'Product' });
    await user.type(input, 'P-1001');
    expect(onChange).toHaveBeenLastCalledWith('P-1001');

    await user.clear(input);
    await user.type(input, 'UNKNOWN');
    expect(onChange).toHaveBeenLastCalledWith('');
    await user.tab();
    expect(input).toHaveValue('');
  });
});
