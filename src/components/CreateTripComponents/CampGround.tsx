import { useEffect, useState } from "react";
import type { Trip } from "../../models/trip";
import { apiFetch } from "../../api/api";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import type { Weather } from "../../models/weather";
import WeatherComponent from "../Items/WeatherItem";

interface TripCampGroundsProps {
  recAreaId?: number;
  startDate: Date;
  endDate: Date;
  onChange: (partial: Partial<Trip>) => void;
}

export const TripCampground = ({
  recAreaId,
  onChange,
  startDate,
  endDate,
}: TripCampGroundsProps) => {
  const [campgrounds, setCampgrounds] = useState<string[]>([]);
  const [selectedCampGrounds, setSelectedCampGrounds] = useState<
    { name: string; dates: Date[] }[]
  >([]);
  const [activeCampground, setActiveCampground] = useState<string | null>(null);

  const [weather, setWeather] = useState<Weather[]>([]);

  // Fetch campgrounds
  useEffect(() => {
    if (!recAreaId) return;

    const fetchCampGrounds = async () => {
      try {
        const data: { FacilityName: string }[] = await apiFetch(
          `/ridb/recareas/${recAreaId}/campgrounds`
        );
        setCampgrounds(data.map((a) => a.FacilityName));
      } catch (err) {
        console.error("Failed to fetch campgrounds:", err);
      }
    };

    fetchCampGrounds();
  }, [recAreaId]);

  // Fetch weather
  useEffect(() => {
    if (!recAreaId) return;

    const fetchWeatherData = async () => {
      try {
        const coords: { latitude: number; longitude: number } = await apiFetch(
          `/ridb/recareas/${recAreaId}/coords`
        );

        const startDateStr = startDate.toISOString().split("T")[0];
        const endDateStr = endDate.toISOString().split("T")[0];

        const weatherData: Weather[] = await apiFetch(
          `/weather?latitude=${coords.latitude}&longitude=${coords.longitude}&start_date=${startDateStr}&end_date=${endDateStr}&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,precipitation_sum,weathercode`
        );

        setWeather(
          weatherData.map((d) => ({
            date: d.date,
            temperature_max: d.temperature_max,
            temperature_min: d.temperature_min,
            windspeed: d.windspeed ?? 0,
            precipitation: d.precipitation ?? 0,
            weathercode: d.weathercode ?? 0,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      }
    };

    fetchWeatherData();
  }, [recAreaId]);

  const handleDateSelect = (date: Date) => {
    if (!activeCampground) return;

    setSelectedCampGrounds((prev) => {
      const campgroundWithDates = prev.find((c) => c.name === activeCampground);

      if (!campgroundWithDates) {
        const updated = [...prev, { name: activeCampground, dates: [date] }];
        onChange({
          campGrounds: updated.map((c) => ({ campgroundName: c.name, dates: c.dates })),
        });
        return updated;
      } else {
        const dateExists = campgroundWithDates.dates.some(
          (d) => d.toDateString() === date.toDateString()
        );

        const updatedDates = dateExists
          ? campgroundWithDates.dates.filter((d) => d.toDateString() !== date.toDateString())
          : [...campgroundWithDates.dates, date];

        const updated = prev.map((c) =>
          c.name === activeCampground ? { name: activeCampground, dates: updatedDates } : c
        );

        onChange({
          campGrounds: updated.map((c) => ({ campgroundName: c.name, dates: c.dates })),
        });

        return updated;
      }
    });
  };

  const getActiveCampgroundDates = (): Date[] => {
    if (!activeCampground) return [];
    const campground = selectedCampGrounds.find((c) => c.name === activeCampground);
    return campground ? campground.dates : [];
  };

  const getCampgroundDates = (name: string): Date[] => {
    const campground = selectedCampGrounds.find((c) => c.name === name);
    return campground ? campground.dates : [];
  };

  return (
    <>
      <h2 className="text-black header-container">Set Campground & Dates</h2>
      <div className="text-dark overflow-auto inner-container rounded-3 flex-grow-1 mb-2">
        {campgrounds.map((campground, index) => (
          <button
            key={index}
            onClick={() => setActiveCampground(campground)}
            className={`custom-btn ${activeCampground === campground ? "active" : ""}`}
          >
            {campground}
            <br />
            <small>
              {getCampgroundDates(campground)
                .map((d) => d.toLocaleDateString())
                .join(", ")}
            </small>
          </button>
        ))}
      </div>

      <div
        className="inner-container p-1 mb-2 text-black"
        style={{ flexDirection: "row", display: "flex", maxHeight: "300px" }}
      >
        <DayPicker
          key={activeCampground}
          mode="multiple"
          animate
          month={startDate}
          onDayClick={handleDateSelect}
          selected={getActiveCampgroundDates()}
          disabled={(date) =>
            !activeCampground || date < startDate || date > endDate
          }
        />
        <div style={{ flex: 1, overflowY: "auto", marginLeft: "10px" }}>
          {weather.map((w, index) => (
            <WeatherComponent
              key={index}
              weathercode={w.weathercode}
              windspeed={w.windspeed}
              temperature_max={w.temperature_max}
              temperature_min={w.temperature_min}
              date={w.date}
              precipitation={w.precipitation}
            />
          ))}
        </div>
      </div>
    </>
  );
};
