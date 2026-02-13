import { Component, For, splitProps, Show } from 'solid-js';
import { BsChevronLeft, BsChevronRight, BsChevronBarLeft, BsChevronBarRight } from 'solid-icons/bs';
import '../../styles/components/navigation/Pagination.css';

export interface PaginationProps {
  // Required controlled state
  page: number; // Current page (1-indexed)
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void;
  // Optional appearance
  variant?: 'primary' | 'secondary' | 'subtle';
  size?: 'compact' | 'normal' | 'spacious';
  // Optional features
  showFirstLast?: boolean; // Show first/last page buttons (default: true)
  showPrevNext?: boolean; // Show prev/next page buttons (default: true)
  siblingCount?: number; // Number of page buttons on each side of current (default: 1)
  // Other
  disabled?: boolean;
  class?: string;
}

export const Pagination: Component<PaginationProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'page',
    'totalPages',
    'onPageChange',
    'variant',
    'size',
    'showFirstLast',
    'showPrevNext',
    'siblingCount',
    'disabled',
    'class',
  ]);

  const variant = () => local.variant ?? 'secondary';
  const size = () => local.size ?? 'normal';
  const shouldShowFirstLast = () => {
    // Explicitly handle false value (default to true)
    return local.showFirstLast !== false;
  };
  const shouldShowPrevNext = () => {
    // Explicitly handle false value (default to true)
    return local.showPrevNext !== false;
  };
  const siblingCount = () => local.siblingCount ?? 1;

  // Calculate which page numbers to show
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const current = local.page;
    const total = local.totalPages;
    const siblings = siblingCount();

    if (total <= 7) {
      // Show all pages if 7 or fewer
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Always show first and last
    const pages: (number | 'ellipsis')[] = [];

    // Calculate range around current page
    const leftSibling = Math.max(current - siblings, 1);
    const rightSibling = Math.min(current + siblings, total);

    // Show left ellipsis if gap exists
    const showLeftEllipsis = leftSibling > 2;
    // Show right ellipsis if gap exists
    const showRightEllipsis = rightSibling < total - 1;

    // First page
    pages.push(1);

    // Left ellipsis if there's a gap
    if (showLeftEllipsis) {
      pages.push('ellipsis');
    }

    // Middle pages (around current page)
    // Start from leftSibling but skip page 1 and total
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i > 1 && i < total) {
        pages.push(i);
      }
    }

    // Right ellipsis if there's a gap
    if (showRightEllipsis) {
      pages.push('ellipsis');
    }

    // Last page
    if (total > 1) {
      pages.push(total);
    }

    return pages;
  };

  const handlePageChange = (newPage: number) => {
    if (local.disabled) return;
    if (newPage < 1 || newPage > local.totalPages) return;
    if (newPage === local.page) return;
    local.onPageChange(newPage);
  };

  const canGoPrev = () => local.page > 1 && !local.disabled;
  const canGoNext = () => local.page < local.totalPages && !local.disabled;

  const classNames = () => {
    const classes = ['pagination'];

    classes.push(`pagination--${variant()}`);

    if (size() !== 'normal') {
      classes.push(`pagination--${size()}`);
    }

    if (local.disabled) {
      classes.push('pagination--disabled');
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return (
    <nav class={classNames()} aria-label="Pagination" {...rest}>
      <div class="pagination__container">
        {/* First page button */}
        <Show when={shouldShowFirstLast()}>
          <button
            type="button"
            class="pagination__button pagination__button--first"
            onClick={() => handlePageChange(1)}
            disabled={!canGoPrev()}
            aria-label="Go to first page"
          >
            <BsChevronBarLeft />
          </button>
        </Show>

        {/* Previous page button */}
        <Show when={shouldShowPrevNext()}>
          <button
            type="button"
            class="pagination__button pagination__button--prev"
            onClick={() => handlePageChange(local.page - 1)}
            disabled={!canGoPrev()}
            aria-label="Go to previous page"
          >
            <BsChevronLeft />
          </button>
        </Show>

        {/* Page numbers */}
        <div class="pagination__pages">
          <For each={getPageNumbers()}>
            {(item) => (
              <Show
                when={item !== 'ellipsis'}
                fallback={
                  <span class="pagination__ellipsis" aria-hidden="true">
                    …
                  </span>
                }
              >
                <button
                  type="button"
                  class={`pagination__button pagination__button--page ${
                    item === local.page ? 'pagination__button--active' : ''
                  }`}
                  onClick={() => handlePageChange(item as number)}
                  disabled={local.disabled}
                  aria-label={`Go to page ${item}`}
                  aria-current={item === local.page ? 'page' : undefined}
                >
                  {item}
                </button>
              </Show>
            )}
          </For>
        </div>

        {/* Next page button */}
        <Show when={shouldShowPrevNext()}>
          <button
            type="button"
            class="pagination__button pagination__button--next"
            onClick={() => handlePageChange(local.page + 1)}
            disabled={!canGoNext()}
            aria-label="Go to next page"
          >
            <BsChevronRight />
          </button>
        </Show>

        {/* Last page button */}
        <Show when={shouldShowFirstLast()}>
          <button
            type="button"
            class="pagination__button pagination__button--last"
            onClick={() => handlePageChange(local.totalPages)}
            disabled={!canGoNext()}
            aria-label="Go to last page"
          >
            <BsChevronBarRight />
          </button>
        </Show>
      </div>
    </nav>
  );
};
