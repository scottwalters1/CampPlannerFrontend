import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TripActivity } from "./TripActivity";
import { apiFetch } from "../../api/api";

jest.mock("../../api/api", () => ({
  apiFetch: jest.fn(),
}));

test("TripActivity fetches activities and selects a date", async () => {
  const onChangeMock = jest.fn();

  const mockActivities = [
    { Activity: [{activityName:"Hiking", dates:["2025-10-20"]}] }
  ];

  const mockCoords = { latitude: 44.6, longitude: -110.5 };
  const mockWeather = [
    { date: "2025-10-20", temperature_max: 60, temperature_min: 45, windspeed: 5, precipitation: 0, weathercode: 1 },
  ];

  // First call returns activities, second returns coords, third returns weather
  apiFetch.mockResolvedValueOnce(mockActivities)
          .mockResolvedValueOnce(mockCoords)
          .mockResolvedValueOnce(mockWeather);

  const startDate = new Date("2025-10-20");
  const endDate = new Date("2025-10-21");

  render(
    <TripActivity
      recAreaId={101}
      startDate={startDate}
      endDate={endDate}
      onChange={onChangeMock}
    />
  );

  await waitFor(() => {
    expect(screen.getByText("Hiking")).toBeInTheDocument();
  });

  // Select activity
  fireEvent.click(screen.getByText("Hiking"));

  // Pick a date (simulate clicking startDate)
  const dayButton = screen.getByText("20"); // assuming daypicker renders button with day number
  fireEvent.click(dayButton);

  // Check that onChange was called with selected activity and date
  await waitFor(() => {
    expect(onChangeMock).toHaveBeenCalledWith({
      tripActivities: [
        {
          activityName: "Hiking",
          dates: [startDate],
        },
      ],
    });
  });
});
