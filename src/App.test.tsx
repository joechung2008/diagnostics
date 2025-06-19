import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render', () => {
    const view = render(<App />);
    expect(view).toMatchSnapshot();
  });
});
