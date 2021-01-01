import { render, screen } from '@testing-library/react';
import App from './App';

test('renders movie list', () => {
  render(<App />)
  expect(screen.getByText('tenet'))
});
