import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

test('Renders Start Your Next Adventure as test', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const textElement = screen.getByText('Start Your Next Adventure');
  expect(textElement).toBeInTheDocument();
});
