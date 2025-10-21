import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

jest.mock('../api/api', () => ({
  apiFetch: jest.fn(),
}));

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { userID: '123', username: 'TestUser' },
    setUser: jest.fn(),
  }),
}));

test('Renders Start Your Next Adventure as test', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const textElement = screen.getByText('Start Your Next Adventure!');
  expect(textElement).toBeInTheDocument();
});
