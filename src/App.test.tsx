import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('should render', () => {
    const view = render(<App />);
    expect(view).toMatchSnapshot();
  });
});
