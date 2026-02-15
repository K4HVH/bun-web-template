import { render, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi } from 'vitest';
import { Accordion, AccordionItem } from '../../src/components/navigation/Accordion';
import { BsGear } from 'solid-icons/bs';

describe('Accordion', () => {
  // Basic rendering
  describe('Rendering', () => {
    it('renders accordion with items prop', () => {
      const { getByText } = render(() => (
        <Accordion
          items={[
            { value: 'item1', title: 'Item 1', content: <div>Content 1</div> },
            { value: 'item2', title: 'Item 2', content: <div>Content 2</div> },
          ]}
        />
      ));
      expect(getByText('Item 1')).toBeInTheDocument();
      expect(getByText('Item 2')).toBeInTheDocument();
    });

    it('renders accordion with children', () => {
      const { getByText } = render(() => (
        <Accordion>
          <AccordionItem value="item1" title="Item 1">
            <div>Content 1</div>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <div>Content 2</div>
          </AccordionItem>
        </Accordion>
      ));
      expect(getByText('Item 1')).toBeInTheDocument();
      expect(getByText('Item 2')).toBeInTheDocument();
    });

    it('renders custom icons', () => {
      const { container } = render(() => (
        <Accordion
          items={[
            { value: 'item1', title: 'Item 1', content: <div>Content</div>, icon: BsGear },
          ]}
        />
      ));
      expect(container.querySelector('.accordion__custom-icon')).toBeInTheDocument();
    });
  });

  // Exclusive mode
  describe('Exclusive mode', () => {
    it('only allows one item open at a time', async () => {
      const { getByText, container } = render(() => (
        <Accordion exclusive defaultValue={['item1']}>
          <AccordionItem value="item1" title="Item 1">
            <div>Content 1</div>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <div>Content 2</div>
          </AccordionItem>
        </Accordion>
      ));

      const item1Content = getByText('Content 1').closest('.accordion__content');
      const item2Content = getByText('Content 2').closest('.accordion__content');

      // First item should be open
      expect(item1Content).toHaveClass('accordion__content--expanded');
      expect(item2Content).not.toHaveClass('accordion__content--expanded');

      // Click second item
      fireEvent.click(getByText('Item 2'));

      // Second item should be open, first should be closed
      expect(item1Content).not.toHaveClass('accordion__content--expanded');
      expect(item2Content).toHaveClass('accordion__content--expanded');
    });

    it('collapses when clicking the same item', async () => {
      const { getByText } = render(() => (
        <Accordion exclusive defaultValue={['item1']}>
          <AccordionItem value="item1" title="Item 1">
            <div>Content 1</div>
          </AccordionItem>
        </Accordion>
      ));

      const item1Content = getByText('Content 1').closest('.accordion__content');
      expect(item1Content).toHaveClass('accordion__content--expanded');

      // Click the same item
      fireEvent.click(getByText('Item 1'));

      // Should be collapsed
      expect(item1Content).not.toHaveClass('accordion__content--expanded');
    });
  });

  // Non-exclusive mode
  describe('Non-exclusive mode', () => {
    it('allows multiple items open simultaneously', async () => {
      const { getByText } = render(() => (
        <Accordion exclusive={false} defaultValue={['item1', 'item2']}>
          <AccordionItem value="item1" title="Item 1">
            <div>Content 1</div>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <div>Content 2</div>
          </AccordionItem>
        </Accordion>
      ));

      expect(getByText('Content 1')).toBeVisible();
      expect(getByText('Content 2')).toBeVisible();
    });

    it('can collapse individual items', async () => {
      const { getByText } = render(() => (
        <Accordion exclusive={false} defaultValue={['item1', 'item2']}>
          <AccordionItem value="item1" title="Item 1">
            <div>Content 1</div>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <div>Content 2</div>
          </AccordionItem>
        </Accordion>
      ));

      const item1Content = getByText('Content 1').closest('.accordion__content');
      const item2Content = getByText('Content 2').closest('.accordion__content');

      // Click first item to collapse it
      fireEvent.click(getByText('Item 1'));

      // First should be collapsed, second still open
      expect(item1Content).not.toHaveClass('accordion__content--expanded');
      expect(item2Content).toHaveClass('accordion__content--expanded');
    });
  });

  // Controlled mode
  describe('Controlled mode', () => {
    it('uses value prop when provided', () => {
      const { getByText } = render(() => (
        <Accordion value={['item2']}>
          <AccordionItem value="item1" title="Item 1">
            <div>Content 1</div>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <div>Content 2</div>
          </AccordionItem>
        </Accordion>
      ));

      const item1Content = getByText('Content 1').closest('.accordion__content');
      const item2Content = getByText('Content 2').closest('.accordion__content');

      expect(item1Content).not.toHaveClass('accordion__content--expanded');
      expect(item2Content).toHaveClass('accordion__content--expanded');
    });

    it('calls onChange when item is toggled', async () => {
      const handleChange = vi.fn();
      const { getByText } = render(() => (
        <Accordion value={['item1']} onChange={handleChange}>
          <AccordionItem value="item1" title="Item 1">
            <div>Content 1</div>
          </AccordionItem>
          <AccordionItem value="item2" title="Item 2">
            <div>Content 2</div>
          </AccordionItem>
        </Accordion>
      ));

      fireEvent.click(getByText('Item 2'));
      expect(handleChange).toHaveBeenCalledWith(['item2']);
    });
  });

  // Variants
  describe('Variants', () => {
    it('applies default variant by default', () => {
      const { container } = render(() => (
        <Accordion>
          <AccordionItem value="item1" title="Item 1">
            <div>Content</div>
          </AccordionItem>
        </Accordion>
      ));
      expect(container.querySelector('.accordion--default')).toBeInTheDocument();
    });

    it('applies emphasized variant', () => {
      const { container } = render(() => (
        <Accordion variant="emphasized">
          <AccordionItem value="item1" title="Item 1">
            <div>Content</div>
          </AccordionItem>
        </Accordion>
      ));
      expect(container.querySelector('.accordion--emphasized')).toBeInTheDocument();
    });

    it('applies subtle variant', () => {
      const { container } = render(() => (
        <Accordion variant="subtle">
          <AccordionItem value="item1" title="Item 1">
            <div>Content</div>
          </AccordionItem>
        </Accordion>
      ));
      expect(container.querySelector('.accordion--subtle')).toBeInTheDocument();
    });
  });

  // Sizes
  describe('Sizes', () => {
    it('applies normal size by default', () => {
      const { container } = render(() => (
        <Accordion>
          <AccordionItem value="item1" title="Item 1">
            <div>Content</div>
          </AccordionItem>
        </Accordion>
      ));
      const accordion = container.querySelector('.accordion');
      expect(accordion).not.toHaveClass('accordion--compact');
      expect(accordion).not.toHaveClass('accordion--spacious');
    });

    it('applies compact size', () => {
      const { container } = render(() => (
        <Accordion size="compact">
          <AccordionItem value="item1" title="Item 1">
            <div>Content</div>
          </AccordionItem>
        </Accordion>
      ));
      expect(container.querySelector('.accordion--compact')).toBeInTheDocument();
    });

    it('applies spacious size', () => {
      const { container } = render(() => (
        <Accordion size="spacious">
          <AccordionItem value="item1" title="Item 1">
            <div>Content</div>
          </AccordionItem>
        </Accordion>
      ));
      expect(container.querySelector('.accordion--spacious')).toBeInTheDocument();
    });
  });

  // Disabled items
  describe('Disabled items', () => {
    it('does not expand disabled items', async () => {
      const { getByText } = render(() => (
        <Accordion>
          <AccordionItem value="item1" title="Item 1" disabled>
            <div>Content 1</div>
          </AccordionItem>
        </Accordion>
      ));

      const item1Content = getByText('Content 1').closest('.accordion__content');

      fireEvent.click(getByText('Item 1'));
      expect(item1Content).not.toHaveClass('accordion__content--expanded');
    });

    it('applies disabled class to disabled items', () => {
      const { container } = render(() => (
        <Accordion>
          <AccordionItem value="item1" title="Item 1" disabled>
            <div>Content 1</div>
          </AccordionItem>
        </Accordion>
      ));
      expect(container.querySelector('.accordion__item--disabled')).toBeInTheDocument();
    });

    it('disables button element for disabled items', () => {
      const { container } = render(() => (
        <Accordion>
          <AccordionItem value="item1" title="Item 1" disabled>
            <div>Content 1</div>
          </AccordionItem>
        </Accordion>
      ));
      const button = container.querySelector('.accordion__header') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });
  });

  // Keyboard interaction
  describe('Keyboard interaction', () => {
    it('toggles on Enter key', async () => {
      const { getByText, queryByText } = render(() => (
        <Accordion>
          <AccordionItem value="item1" title="Item 1">
            <div>Content 1</div>
          </AccordionItem>
        </Accordion>
      ));

      const header = getByText('Item 1');
      fireEvent.keyDown(header, { key: 'Enter' });

      expect(getByText('Content 1')).toBeInTheDocument();
    });

    it('toggles on Space key', async () => {
      const { getByText } = render(() => (
        <Accordion>
          <AccordionItem value="item1" title="Item 1">
            <div>Content 1</div>
          </AccordionItem>
        </Accordion>
      ));

      const header = getByText('Item 1');
      fireEvent.keyDown(header, { key: ' ' });

      expect(getByText('Content 1')).toBeInTheDocument();
    });
  });

  // Expanded state classes
  describe('Expanded state', () => {
    it('applies expanded class to expanded items', () => {
      const { container } = render(() => (
        <Accordion defaultValue={['item1']}>
          <AccordionItem value="item1" title="Item 1">
            <div>Content 1</div>
          </AccordionItem>
        </Accordion>
      ));
      expect(container.querySelector('.accordion__item--expanded')).toBeInTheDocument();
    });

    it('applies expanded class to icon when expanded', () => {
      const { container } = render(() => (
        <Accordion defaultValue={['item1']}>
          <AccordionItem value="item1" title="Item 1">
            <div>Content 1</div>
          </AccordionItem>
        </Accordion>
      ));
      expect(container.querySelector('.accordion__icon--expanded')).toBeInTheDocument();
    });
  });

  // ARIA attributes
  describe('Accessibility', () => {
    it('sets aria-expanded to true when expanded', () => {
      const { container } = render(() => (
        <Accordion defaultValue={['item1']}>
          <AccordionItem value="item1" title="Item 1">
            <div>Content</div>
          </AccordionItem>
        </Accordion>
      ));
      const button = container.querySelector('.accordion__header');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('sets aria-expanded to false when collapsed', () => {
      const { container } = render(() => (
        <Accordion>
          <AccordionItem value="item1" title="Item 1">
            <div>Content</div>
          </AccordionItem>
        </Accordion>
      ));
      const button = container.querySelector('.accordion__header');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('sets aria-disabled on disabled items', () => {
      const { container } = render(() => (
        <Accordion>
          <AccordionItem value="item1" title="Item 1" disabled>
            <div>Content</div>
          </AccordionItem>
        </Accordion>
      ));
      const button = container.querySelector('.accordion__header');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Custom class
  describe('Custom props', () => {
    it('applies custom class to accordion', () => {
      const { container } = render(() => (
        <Accordion class="custom-accordion">
          <AccordionItem value="item1" title="Item 1">
            <div>Content</div>
          </AccordionItem>
        </Accordion>
      ));
      expect(container.querySelector('.custom-accordion')).toBeInTheDocument();
    });

    it('applies custom class to accordion item', () => {
      const { container } = render(() => (
        <Accordion>
          <AccordionItem value="item1" title="Item 1" class="custom-item">
            <div>Content</div>
          </AccordionItem>
        </Accordion>
      ));
      expect(container.querySelector('.custom-item')).toBeInTheDocument();
    });
  });
});
