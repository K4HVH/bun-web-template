import { render, fireEvent } from '@solidjs/testing-library';
import { describe, it, expect, vi } from 'vitest';
import { Card, CardHeader } from '../../src/components/Card';

describe('Card', () => {
  it('renders children content', () => {
    const { getByText } = render(() => <Card>Card content</Card>);
    expect(getByText('Card content')).toBeInTheDocument();
  });

  it('applies default variant class', () => {
    const { container } = render(() => <Card>Content</Card>);
    const card = container.querySelector('.card');
    expect(card).toBeInTheDocument();
    expect(card?.classList.contains('card--emphasized')).toBe(false);
    expect(card?.classList.contains('card--subtle')).toBe(false);
  });

  it('applies emphasized variant class', () => {
    const { container } = render(() => <Card variant="emphasized">Content</Card>);
    const card = container.querySelector('.card--emphasized');
    expect(card).toBeInTheDocument();
  });

  it('applies subtle variant class', () => {
    const { container } = render(() => <Card variant="subtle">Content</Card>);
    const card = container.querySelector('.card--subtle');
    expect(card).toBeInTheDocument();
  });

  it('applies primary accent class', () => {
    const { container } = render(() => <Card accent="primary">Content</Card>);
    const card = container.querySelector('.card--accent-left.card--primary');
    expect(card).toBeInTheDocument();
  });

  it('applies compact padding class', () => {
    const { container } = render(() => <Card padding="compact">Content</Card>);
    const card = container.querySelector('.card--compact');
    expect(card).toBeInTheDocument();
  });

  it('applies spacious padding class', () => {
    const { container } = render(() => <Card padding="spacious">Content</Card>);
    const card = container.querySelector('.card--spacious');
    expect(card).toBeInTheDocument();
  });

  it('applies interactive class when interactive prop is true', () => {
    const { container } = render(() => <Card interactive>Content</Card>);
    const card = container.querySelector('.card--interactive');
    expect(card).toBeInTheDocument();
  });

  it('handles click events when interactive', () => {
    const handleClick = vi.fn();
    const { container } = render(() => (
      <Card interactive onClick={handleClick}>Content</Card>
    ));
    const card = container.querySelector('.card') as HTMLElement;
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('combines multiple props correctly', () => {
    const { container } = render(() => (
      <Card variant="emphasized" accent="primary" padding="spacious" interactive>
        Content
      </Card>
    ));
    const card = container.querySelector('.card');
    expect(card?.classList.contains('card--emphasized')).toBe(true);
    expect(card?.classList.contains('card--accent-left')).toBe(true);
    expect(card?.classList.contains('card--primary')).toBe(true);
    expect(card?.classList.contains('card--spacious')).toBe(true);
    expect(card?.classList.contains('card--interactive')).toBe(true);
  });
});

describe('CardHeader', () => {
  it('renders title', () => {
    const { getByText } = render(() => <CardHeader title="Card Title" />);
    expect(getByText('Card Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = render(() => (
      <CardHeader title="Title" subtitle="Subtitle text" />
    ));
    expect(getByText('Subtitle text')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { container } = render(() => <CardHeader title="Title" />);
    const subtitle = container.querySelector('.card-header__subtitle');
    expect(subtitle).not.toBeInTheDocument();
  });

  it('applies correct structure', () => {
    const { container, getByText } = render(() => (
      <CardHeader title="Title" subtitle="Subtitle" />
    ));

    // Check title and subtitle are in document
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Subtitle')).toBeInTheDocument();
  });
});
