import { render } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import App from '../../src/app/App';

describe('App', () => {
  it('renders the design system test page', () => {
    const { getByText } = render(() => <App />);
    expect(getByText('Design System Test Page')).toBeInTheDocument();
  });

  it('renders typography section', () => {
    const { getByText } = render(() => <App />);
    expect(getByText('Typography Examples')).toBeInTheDocument();
  });

  it('renders component sections', () => {
    const { getByText } = render(() => <App />);
    expect(getByText('Card Component Examples')).toBeInTheDocument();
    expect(getByText('Checkbox Component Examples')).toBeInTheDocument();
    expect(getByText('Button Component Examples')).toBeInTheDocument();
    expect(getByText('Combobox Examples')).toBeInTheDocument();
  });
});
