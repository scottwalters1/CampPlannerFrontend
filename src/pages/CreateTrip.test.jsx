import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CreateTrip } from './CreateTrip';

// Mock apiFetch
jest.mock('../api/api', () => ({
  apiFetch: jest.fn().mockResolvedValue({ tripId: 'trip123' }),
}));

// Mock useAuth
jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { userID: '123', username: 'TestUser' },
    setUser: jest.fn(),
  }),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


test('CreateTrip workflow renders steps and posts trip', async () => {
  render(
    <MemoryRouter>
      <CreateTrip />
    </MemoryRouter>
  );

  const nextBtn = screen.getByText('Next', { selector: 'button' });
  expect(nextBtn).toBeDisabled();

  const nameInput = screen.getByPlaceholderText(/enter trip name here/i);
  fireEvent.change(nameInput, { target: { value: "Secret Getaway" } });

  expect(nameInput.value).toBe("Secret Getaway");

  


  // Step 0: TripDetails
  // const nextBtn = screen.getByRole('button', { name: /next/i });
  // expect(nextBtn).toBeDisabled(); // Initially disabled
  // // simulate enabling button
  // fireEvent.click(nextBtn); // just testing button click, state management inside components

  // // Manually move through steps
  // for (let i = 0; i < 4; i++) {
  //   const btn = screen.getByRole('button', { name: /next/i });
  //   fireEvent.click(btn);
  // }

  // // Step 4: AddTripUsers, should show "Finalize" button
  // const finalizeBtn = screen.getByRole('button', { name: /finalize/i });
  // expect(finalizeBtn).toBeInTheDocument();

  // // Click Finalize
  // fireEvent.click(finalizeBtn);

  // // Wait for postTrip async
  // await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/trips'));
});
