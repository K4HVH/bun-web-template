import { render } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import { Badge } from '../../src/components/display/Badge';
import { BsStar, BsBell } from 'solid-icons/bs';

describe('Badge', () => {
  it('renders child element', () => {
    const { getByText } = render(() => (
      <Badge content={5}>
        <button>Button</button>
      </Badge>
    ));
    expect(getByText('Button')).toBeInTheDocument();
  });

  it('renders badge with number content', () => {
    const { getByText } = render(() => (
      <Badge content={5}>
        <button>Button</button>
      </Badge>
    ));
    expect(getByText('5')).toBeInTheDocument();
  });

  it('renders badge with text content', () => {
    const { getByText } = render(() => (
      <Badge content="New">
        <button>Button</button>
      </Badge>
    ));
    expect(getByText('New')).toBeInTheDocument();
  });

  it('applies error variant by default', () => {
    const { container } = render(() => (
      <Badge content={5}>
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge--error');
  });

  it('applies primary variant', () => {
    const { container } = render(() => (
      <Badge content={5} variant="primary">
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge--primary');
  });

  it('applies success variant', () => {
    const { container } = render(() => (
      <Badge content={5} variant="success">
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge--success');
  });

  it('applies warning variant', () => {
    const { container } = render(() => (
      <Badge content={5} variant="warning">
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge--warning');
  });

  it('applies info variant', () => {
    const { container } = render(() => (
      <Badge content={5} variant="info">
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge--info');
  });

  it('applies neutral variant', () => {
    const { container } = render(() => (
      <Badge content={5} variant="neutral">
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge--neutral');
  });

  it('applies top-right placement by default', () => {
    const { container } = render(() => (
      <Badge content={5}>
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge--top-right');
  });

  it('applies top-left placement', () => {
    const { container } = render(() => (
      <Badge content={5} placement="top-left">
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge--top-left');
  });

  it('applies bottom-right placement', () => {
    const { container } = render(() => (
      <Badge content={5} placement="bottom-right">
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge--bottom-right');
  });

  it('applies bottom-left placement', () => {
    const { container } = render(() => (
      <Badge content={5} placement="bottom-left">
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge--bottom-left');
  });

  it('renders as dot variant', () => {
    const { container } = render(() => (
      <Badge dot>
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge--dot');
  });

  it('does not render content in dot variant', () => {
    const { container } = render(() => (
      <Badge dot content={5}>
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge?.textContent).toBe('');
  });

  it('renders with icon', () => {
    const { container } = render(() => (
      <Badge icon={BsStar}>
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('badge--icon');
  });

  it('does not render content with icon', () => {
    const { container } = render(() => (
      <Badge icon={BsBell} content={5}>
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    // Should not contain the number "5"
    expect(badge?.textContent).not.toBe('5');
  });

  it('displays 99+ for numbers over max', () => {
    const { getByText } = render(() => (
      <Badge content={150}>
        <button>Button</button>
      </Badge>
    ));
    expect(getByText('99+')).toBeInTheDocument();
  });

  it('respects custom max value', () => {
    const { getByText } = render(() => (
      <Badge content={150} max={200}>
        <button>Button</button>
      </Badge>
    ));
    expect(getByText('150')).toBeInTheDocument();
  });

  it('hides badge when content is 0 by default', () => {
    const { container } = render(() => (
      <Badge content={0}>
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).not.toBeInTheDocument();
  });

  it('shows badge when content is 0 and showZero is true', () => {
    const { getByText } = render(() => (
      <Badge content={0} showZero>
        <button>Button</button>
      </Badge>
    ));
    expect(getByText('0')).toBeInTheDocument();
  });

  it('hides badge when content is undefined', () => {
    const { container } = render(() => (
      <Badge>
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).not.toBeInTheDocument();
  });

  it('applies custom class', () => {
    const { container } = render(() => (
      <Badge content={5} class="custom-badge">
        <button>Button</button>
      </Badge>
    ));
    const badge = container.querySelector('.badge');
    expect(badge).toHaveClass('custom-badge');
  });
});
