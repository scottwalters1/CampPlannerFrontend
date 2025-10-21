import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TripFacility } from './TripFacility';
import { apiFetch } from '../../api/api';

jest.mock('../../api/api', () => ({
  apiFetch: jest.fn(),
}));

test('TripFacility searches and selects a facility', async () => {
  const onChangeMock = jest.fn();
  const isDisabledMock = jest.fn();

  const mockFacilities = [
    { RecAreaName: 'Yellowstone', RecAreaID: '101' },
    { RecAreaName: 'Yosemite', RecAreaID: '102' },
  ];

  apiFetch.mockResolvedValue(mockFacilities);

  render(<TripFacility onChange={onChangeMock} isDisabled={isDisabledMock} />);

  //button is disabled because we havent selected anything yet.
  expect(isDisabledMock).toHaveBeenCalledWith(true);

  const input = screen.getByPlaceholderText(/search query/i);
  fireEvent.change(input, { target: { value: 'Y' } });
  expect(input.value).toBe('Y');

  const searchBtn = screen.getByText(/search/i);
  fireEvent.click(searchBtn);

  await waitFor(() => {
    expect(screen.getByText('Yellowstone')).toBeInTheDocument();
    expect(screen.getByText('Yosemite')).toBeInTheDocument();
  });

  const yellowstoneBtn = screen.getByText('Yellowstone');
  fireEvent.click(yellowstoneBtn);

  expect(onChangeMock).toHaveBeenCalledWith({
    recAreaName: 'Yellowstone',
    recAreaId: 101,
  });

  //button is enabled because we have an active 
  expect(isDisabledMock).toHaveBeenCalledWith(false);
});
