import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('Customers', () => {
  render(<App />);
  const linkElement = screen.getByText(/Customers/i);
  expect(linkElement).toBeInTheDocument();
});
