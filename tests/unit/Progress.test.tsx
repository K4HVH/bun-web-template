import { render } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import { Progress } from '../../src/components/feedback/Progress';

describe('Progress', () => {
  // Type tests
  describe('Type variants', () => {
    it('renders circular type by default', () => {
      const { container } = render(() => <Progress value={50} />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('progress--circular');
    });

    it('renders linear type when specified', () => {
      const { container } = render(() => <Progress type="linear" value={50} />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('progress--linear');
    });

    it('renders circular type when specified', () => {
      const { container } = render(() => <Progress type="circular" value={50} />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('progress--circular');
    });
  });

  // Determinate vs Indeterminate
  describe('Determinate and Indeterminate modes', () => {
    it('renders indeterminate when value is undefined', () => {
      const { container } = render(() => <Progress />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('progress--indeterminate');
    });

    it('renders indeterminate when value is null', () => {
      const { container } = render(() => <Progress value={null as any} />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('progress--indeterminate');
    });

    it('renders determinate when value is provided', () => {
      const { container } = render(() => <Progress value={50} />);
      const progress = container.querySelector('.progress');
      expect(progress).not.toHaveClass('progress--indeterminate');
    });

    it('sets aria-valuenow for determinate progress', () => {
      const { container } = render(() => <Progress value={75} />);
      const progress = container.querySelector('[role="progressbar"]');
      expect(progress).toHaveAttribute('aria-valuenow', '75');
    });

    it('does not set aria-valuenow for indeterminate progress', () => {
      const { container } = render(() => <Progress />);
      const progress = container.querySelector('[role="progressbar"]');
      expect(progress).not.toHaveAttribute('aria-valuenow');
    });
  });

  // Value clamping
  describe('Value clamping', () => {
    it('clamps negative values to 0', () => {
      const { container } = render(() => <Progress value={-10} />);
      const progress = container.querySelector('[role="progressbar"]');
      expect(progress).toHaveAttribute('aria-valuenow', '0');
    });

    it('clamps values over 100 to 100', () => {
      const { container } = render(() => <Progress value={150} />);
      const progress = container.querySelector('[role="progressbar"]');
      expect(progress).toHaveAttribute('aria-valuenow', '100');
    });

    it('handles 0% correctly', () => {
      const { container } = render(() => <Progress value={0} />);
      const progress = container.querySelector('[role="progressbar"]');
      expect(progress).toHaveAttribute('aria-valuenow', '0');
    });

    it('handles 100% correctly', () => {
      const { container } = render(() => <Progress value={100} />);
      const progress = container.querySelector('[role="progressbar"]');
      expect(progress).toHaveAttribute('aria-valuenow', '100');
    });
  });

  // Variant tests
  describe('Variant styles', () => {
    it('applies primary variant by default', () => {
      const { container } = render(() => <Progress value={50} />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('progress--primary');
    });

    it('applies primary variant when specified', () => {
      const { container } = render(() => <Progress value={50} variant="primary" />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('progress--primary');
    });

    it('applies success variant', () => {
      const { container } = render(() => <Progress value={100} variant="success" />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('progress--success');
    });

    it('applies warning variant', () => {
      const { container } = render(() => <Progress value={60} variant="warning" />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('progress--warning');
    });

    it('applies error variant', () => {
      const { container } = render(() => <Progress value={25} variant="error" />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('progress--error');
    });
  });

  // Size tests
  describe('Size variants', () => {
    it('applies normal size by default', () => {
      const { container } = render(() => <Progress value={50} />);
      const progress = container.querySelector('.progress');
      expect(progress).not.toHaveClass('progress--sm');
      expect(progress).not.toHaveClass('progress--lg');
    });

    it('applies small size', () => {
      const { container } = render(() => <Progress value={50} size="sm" />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('progress--sm');
    });

    it('applies normal size explicitly', () => {
      const { container } = render(() => <Progress value={50} size="normal" />);
      const progress = container.querySelector('.progress');
      expect(progress).not.toHaveClass('progress--sm');
      expect(progress).not.toHaveClass('progress--lg');
    });

    it('applies large size', () => {
      const { container } = render(() => <Progress value={50} size="lg" />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('progress--lg');
    });
  });

  // Label tests
  describe('Labels', () => {
    it('does not show label by default', () => {
      const { container } = render(() => <Progress value={50} />);
      const label = container.querySelector('.progress__label');
      expect(label).not.toBeInTheDocument();
    });

    it('shows percentage label when showLabel is true', () => {
      const { getByText } = render(() => <Progress value={75} showLabel />);
      expect(getByText('75%')).toBeInTheDocument();
    });

    it('does not show label for indeterminate progress even with showLabel', () => {
      const { container } = render(() => <Progress showLabel />);
      const label = container.querySelector('.progress__label');
      expect(label).not.toBeInTheDocument();
    });

    it('rounds percentage to whole number', () => {
      const { getByText } = render(() => <Progress value={33.7} showLabel />);
      expect(getByText('34%')).toBeInTheDocument();
    });

    it('shows custom label when provided', () => {
      const { getByText } = render(() => <Progress value={50} label="Halfway done!" />);
      expect(getByText('Halfway done!')).toBeInTheDocument();
    });

    it('custom label overrides showLabel percentage', () => {
      const { getByText, queryByText } = render(() => (
        <Progress value={50} showLabel label="Custom" />
      ));
      expect(getByText('Custom')).toBeInTheDocument();
      expect(queryByText('50%')).not.toBeInTheDocument();
    });
  });

  // Linear specific tests
  describe('Linear progress specific', () => {
    it('renders track and fill elements', () => {
      const { container } = render(() => <Progress type="linear" value={50} />);
      expect(container.querySelector('.progress__track')).toBeInTheDocument();
      expect(container.querySelector('.progress__fill')).toBeInTheDocument();
    });

    it('sets fill width based on value', () => {
      const { container } = render(() => <Progress type="linear" value={60} />);
      const fill = container.querySelector('.progress__fill') as HTMLElement;
      expect(fill.style.width).toBe('60%');
    });
  });

  // Circular specific tests
  describe('Circular progress specific', () => {
    it('renders SVG elements', () => {
      const { container } = render(() => <Progress type="circular" value={50} />);
      expect(container.querySelector('.progress__svg')).toBeInTheDocument();
      expect(container.querySelector('.progress__circle-bg')).toBeInTheDocument();
      expect(container.querySelector('.progress__circle')).toBeInTheDocument();
    });

    it('label has circular modifier class', () => {
      const { container } = render(() => <Progress type="circular" value={50} showLabel />);
      const label = container.querySelector('.progress__label');
      expect(label).toHaveClass('progress__label--circular');
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has progressbar role', () => {
      const { container } = render(() => <Progress value={50} />);
      const progress = container.querySelector('[role="progressbar"]');
      expect(progress).toBeInTheDocument();
    });

    it('sets aria-valuemin to 0', () => {
      const { container } = render(() => <Progress value={50} />);
      const progress = container.querySelector('[role="progressbar"]');
      expect(progress).toHaveAttribute('aria-valuemin', '0');
    });

    it('sets aria-valuemax to 100', () => {
      const { container } = render(() => <Progress value={50} />);
      const progress = container.querySelector('[role="progressbar"]');
      expect(progress).toHaveAttribute('aria-valuemax', '100');
    });
  });

  // Custom props
  describe('Custom props', () => {
    it('applies custom class', () => {
      const { container } = render(() => <Progress value={50} class="custom-progress" />);
      const progress = container.querySelector('.progress');
      expect(progress).toHaveClass('custom-progress');
    });

    it('forwards additional HTML attributes', () => {
      const { container } = render(() => <Progress value={50} data-testid="my-progress" />);
      const progress = container.querySelector('[data-testid="my-progress"]');
      expect(progress).toBeInTheDocument();
    });
  });
});
