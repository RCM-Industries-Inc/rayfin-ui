import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '@/components/ui/button';

import { Modal } from './modal';

describe('Modal', () => {
  it('keeps the shell within the viewport and scrolls only the body', () => {
    render(
      <Modal
        title="Shop Order 123"
        subtitle="Part 456"
        onClose={vi.fn()}
        footer={<Button>Save changes</Button>}
      >
        <div>Long modal content</div>
      </Modal>
    );

    expect(document.querySelector('[data-slot="dialog-content"]')).toHaveClass(
      'max-h-[calc(100dvh-2rem)]',
      'grid-rows-[auto_minmax(0,1fr)_auto]',
      'overflow-hidden'
    );
    expect(document.querySelector('[data-slot="modal-body"]')).toHaveClass(
      'min-h-0',
      'overflow-y-auto',
      'overscroll-contain'
    );
    expect(screen.getByText('Shop Order 123')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeVisible();
  });
});
