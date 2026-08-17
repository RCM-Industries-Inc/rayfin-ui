import {
  CheckIcon,
  ChevronDownIcon,
} from 'lucide-react';
import {
  type ComponentProps,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  keywords?: readonly string[];
  disabled?: boolean;
}

interface ComboboxProps
  extends Omit<
    ComponentProps<'input'>,
    'defaultValue' | 'onChange' | 'type' | 'value'
  > {
  options: readonly ComboboxOption[];
  value: string;
  onValueChange: (value: string) => void;
  emptyMessage?: string;
  maxVisibleOptions?: number;
  /**
   * When false, only an exact option value/label or an explicit option choice
   * is committed. Keep this false for reference/master-data fields.
   */
  allowCustomValue?: boolean;
}

const normalize = (value: string) => value.trim().toLocaleLowerCase();

const searchableText = (option: ComboboxOption) =>
  [option.value, option.label, option.description, ...(option.keywords ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase();

export function Combobox({
  options,
  value,
  onValueChange,
  emptyMessage = 'No matching options.',
  maxVisibleOptions = 50,
  allowCustomValue = false,
  className,
  disabled,
  onBlur,
  onFocus,
  onKeyDown,
  ...inputProps
}: ComboboxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const optionIdPrefix = `${listboxId}-option`;
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );
  const displayValue = selectedOption?.label ?? value;
  const [query, setQuery] = useState(displayValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const matchingOptions = useMemo(() => {
    const search = normalize(
      selectedOption && query === displayValue ? '' : query
    );
    if (!search) return [...options];

    return options
      .filter((option) => searchableText(option).includes(search))
      .sort((left, right) => {
        const leftValue = normalize(left.value);
        const rightValue = normalize(right.value);
        const leftLabel = normalize(left.label);
        const rightLabel = normalize(right.label);
        const rank = (optionValue: string, optionLabel: string) => {
          if (optionValue === search || optionLabel === search) return 0;
          if (optionValue.startsWith(search)) return 1;
          if (optionLabel.startsWith(search)) return 2;
          return 3;
        };
        return (
          rank(leftValue, leftLabel) - rank(rightValue, rightLabel) ||
          leftLabel.localeCompare(rightLabel)
        );
      });
  }, [displayValue, options, query, selectedOption]);

  const visibleOptions = matchingOptions.slice(0, maxVisibleOptions);
  const boundedActiveIndex = Math.min(
    activeIndex,
    visibleOptions.length - 1
  );
  const defaultActiveIndex = () => {
    const selectedIndex = visibleOptions.findIndex(
      (option) => option.value === value
    );
    return selectedIndex >= 0 ? selectedIndex : visibleOptions.length > 0 ? 0 : -1;
  };

  useEffect(() => {
    if (!open) setQuery(displayValue);
  }, [displayValue, open]);

  const exactOption = (candidate: string) => {
    const normalizedCandidate = normalize(candidate);
    if (!normalizedCandidate) return undefined;
    return options.find(
      (option) =>
        normalize(option.value) === normalizedCandidate ||
        normalize(option.label) === normalizedCandidate
    );
  };

  const commit = (option: ComboboxOption, returnFocus = true) => {
    if (option.disabled) return;
    onValueChange(option.value);
    setQuery(option.label);
    setOpen(false);
    setActiveIndex(-1);
    if (returnFocus) inputRef.current?.focus();
  };

  const finishEditing = () => {
    if (allowCustomValue) {
      onValueChange(query);
    } else {
      const exact = exactOption(query);
      if (exact && !exact.disabled) onValueChange(exact.value);
      setQuery(exact?.label ?? displayValue);
    }
    setOpen(false);
    setActiveIndex(-1);
  };

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) finishEditing();
    };
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer);
  });

  return (
    <div ref={rootRef} className="relative w-full" data-slot="combobox">
      <Input
        {...inputProps}
        ref={inputRef}
        role="combobox"
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-activedescendant={
          open && boundedActiveIndex >= 0
            ? `${optionIdPrefix}-${boundedActiveIndex}`
            : undefined
        }
        autoComplete="off"
        className={cn('pr-8', className)}
        disabled={disabled}
        value={query}
        onBlur={(event) => {
          onBlur?.(event);
          if (!rootRef.current?.contains(event.relatedTarget as Node)) {
            finishEditing();
          }
        }}
        onChange={(event) => {
          const nextQuery = event.target.value;
          const exact = exactOption(nextQuery);
          setQuery(nextQuery);
          setOpen(true);
          setActiveIndex(0);
          if (allowCustomValue) onValueChange(nextQuery);
          else onValueChange(exact && !exact.disabled ? exact.value : '');
        }}
        onClick={(event) => {
          event.currentTarget.select();
          setOpen(true);
          setActiveIndex(defaultActiveIndex());
        }}
        onFocus={(event) => {
          onFocus?.(event);
          event.currentTarget.select();
          setOpen(true);
          setActiveIndex(defaultActiveIndex());
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;

          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setOpen(true);
            setActiveIndex((current) =>
              Math.min(current + 1, visibleOptions.length - 1)
            );
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);
            setActiveIndex((current) => Math.max(current - 1, 0));
          } else if (event.key === 'Enter' && open) {
            const option = visibleOptions[boundedActiveIndex];
            if (option) {
              event.preventDefault();
              commit(option);
            }
          } else if (event.key === 'Escape' && open) {
            event.preventDefault();
            setQuery(displayValue);
            setOpen(false);
            setActiveIndex(-1);
          } else if (event.key === 'Tab' && open) {
            finishEditing();
          }
        }}
      />
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-fg-3"
        strokeWidth={1.5}
      />

      {open && !disabled && (
        <div
          className="absolute top-[calc(100%+0.25rem)] left-0 z-60 w-full overflow-hidden rounded-md border border-border bg-popover text-[13px] text-popover-foreground shadow-[var(--shadow-menu)]"
          data-slot="combobox-content"
        >
          <div
            id={listboxId}
            role="listbox"
            className="max-h-60 overflow-y-auto p-1"
          >
            {visibleOptions.length > 0 ? (
              visibleOptions.map((option, index) => {
                const selected = option.value === value;
                const active = index === boundedActiveIndex;
                return (
                  <div
                    key={option.value}
                    id={`${optionIdPrefix}-${index}`}
                    role="option"
                    aria-disabled={option.disabled || undefined}
                    aria-selected={selected}
                    className={cn(
                      'relative flex cursor-default items-start gap-2 rounded-sm px-2 py-1.5 outline-none transition-colors duration-[var(--dur-1)] ease-[var(--ease-out)]',
                      active && 'bg-[var(--rcm-tint-hover)]',
                      selected &&
                        'bg-[var(--rcm-tint-selected)] font-semibold text-accent-foreground',
                      option.disabled &&
                        'pointer-events-none text-fg-disabled opacity-60'
                    )}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => commit(option)}
                  >
                    <CheckIcon
                      aria-hidden="true"
                      className={cn(
                        'mt-0.5 size-3.5 shrink-0 text-accent-foreground',
                        !selected && 'invisible'
                      )}
                      strokeWidth={2}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{option.label}</span>
                      {option.description && (
                        <span className="block truncate text-xs font-normal text-fg-2">
                          {option.description}
                        </span>
                      )}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="px-2 py-5 text-center text-fg-2">
                {emptyMessage}
              </div>
            )}
          </div>
          {matchingOptions.length > visibleOptions.length && (
            <div className="border-t border-border px-3 py-2 text-xs text-fg-2">
              Keep typing to narrow {matchingOptions.length.toLocaleString()}{' '}
              matches.
            </div>
          )}
          <span className="sr-only" role="status" aria-live="polite">
            {matchingOptions.length} options available
          </span>
        </div>
      )}
    </div>
  );
}
