import { Component, For, Show, splitProps } from 'solid-js';
import { A } from '@solidjs/router';
import { Dynamic } from 'solid-js/web';
import { BsChevronRight } from 'solid-icons/bs';
import '../../styles/components/navigation/Breadcrumbs.css';

export interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: Component;
  disabled?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'primary' | 'secondary' | 'subtle';
  size?: 'compact' | 'normal' | 'spacious';
  separator?: Component; // Custom separator icon
  maxItems?: number; // Collapse middle items if total exceeds this
  disabled?: boolean;
  class?: string;
}

export const Breadcrumbs: Component<BreadcrumbsProps> = (props) => {
  const [local] = splitProps(props, [
    'items',
    'variant',
    'size',
    'separator',
    'maxItems',
    'disabled',
    'class',
  ]);

  const variant = () => local.variant ?? 'primary';
  const size = () => local.size ?? 'normal';
  const separator = () => local.separator ?? BsChevronRight;

  // Calculate which items to show based on maxItems
  const getVisibleItems = (): (BreadcrumbItem | 'ellipsis')[] => {
    const items = local.items;
    const max = local.maxItems;

    // If no maxItems or items fit within limit, show all
    if (!max || items.length <= max) {
      return items;
    }

    // Ensure we show at least first and last
    if (max < 2) {
      return items;
    }

    // Calculate how many items to show on each side of ellipsis
    // Formula: show first item, ellipsis, last (max - 1) items
    const result: (BreadcrumbItem | 'ellipsis')[] = [];

    // Always show first item
    result.push(items[0]);

    // Add ellipsis
    result.push('ellipsis');

    // Add last (max - 1) items
    const lastItemsCount = max - 1;
    const startIndex = items.length - lastItemsCount;
    for (let i = startIndex; i < items.length; i++) {
      result.push(items[i]);
    }

    return result;
  };

  const classNames = () => {
    const classes = ['breadcrumbs'];

    classes.push(`breadcrumbs--${variant()}`);

    if (size() !== 'normal') {
      classes.push(`breadcrumbs--${size()}`);
    }

    if (local.disabled) {
      classes.push('breadcrumbs--disabled');
    }

    if (local.class) {
      classes.push(local.class);
    }

    return classes.join(' ');
  };

  return (
    <nav class={classNames()} aria-label="Breadcrumb">
      <ol class="breadcrumbs__list">
        <For each={getVisibleItems()}>
          {(item, index) => (
            <Show
              when={item !== 'ellipsis'}
              fallback={
                <li class="breadcrumbs__item breadcrumbs__item--ellipsis">
                  <span class="breadcrumbs__ellipsis" aria-hidden="true">
                    …
                  </span>
                  <span class="breadcrumbs__separator" aria-hidden="true">
                    <Dynamic component={separator()} />
                  </span>
                </li>
              }
            >
              {(() => {
                const breadcrumbItem = item as BreadcrumbItem;
                const isLast = index() === getVisibleItems().length - 1;
                const isDisabled = local.disabled || breadcrumbItem.disabled;

                const itemClasses = () => {
                  const classes = ['breadcrumbs__item'];
                  if (isLast) classes.push('breadcrumbs__item--current');
                  if (isDisabled) classes.push('breadcrumbs__item--disabled');
                  return classes.join(' ');
                };

                return (
                  <li class={itemClasses()}>
                    <Show
                      when={!isLast}
                      fallback={
                        <span class="breadcrumbs__link breadcrumbs__link--current" aria-current="page">
                          <Show when={breadcrumbItem.icon}>
                            <span class="breadcrumbs__icon">
                              <Dynamic component={breadcrumbItem.icon!} />
                            </span>
                          </Show>
                          <span class="breadcrumbs__label">{breadcrumbItem.label}</span>
                        </span>
                      }
                    >
                      <A
                        href={breadcrumbItem.href}
                        class="breadcrumbs__link"
                        aria-disabled={isDisabled ? 'true' : undefined}
                        onClick={(e) => {
                          if (isDisabled) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <Show when={breadcrumbItem.icon}>
                          <span class="breadcrumbs__icon">
                            <Dynamic component={breadcrumbItem.icon!} />
                          </span>
                        </Show>
                        <span class="breadcrumbs__label">{breadcrumbItem.label}</span>
                      </A>
                    </Show>

                    {/* Separator after all items except the last */}
                    <Show when={!isLast}>
                      <span class="breadcrumbs__separator" aria-hidden="true">
                        <Dynamic component={separator()} />
                      </span>
                    </Show>
                  </li>
                );
              })()}
            </Show>
          )}
        </For>
      </ol>
    </nav>
  );
};
