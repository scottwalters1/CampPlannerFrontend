import { useEffect, useState } from "react";
import type { Trip } from "../../models/trip";
import { apiFetch } from "../../api/api";
import { DayPicker } from "react-day-picker";
import type { Weather } from "../../models/weather";
import WeatherComponent from "../Items/WeatherItem";

interface TripActivityProps {
  recAreaId?: number;
  startDate: Date;
  endDate: Date;
  onChange: (partial: Partial<Trip>) => void;
}

export const TripActivity = ({
  recAreaId,
  onChange,
  startDate,
  endDate,
}: TripActivityProps) => {
  const [activities, setActivities] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<
    { name: string; dates: Date[] }[]
  >([]);
  const [activeActivity, selectedActiveActivity] = useState<string | null>(
    null
  );

  const [weather, setWeather] = useState<Weather[]>([]);
  const [weatherErr, setWeatherErr] = useState<boolean>(false);

  useEffect(() => {
    if (!recAreaId) return;

    const fetchActivities = async () => {
      try {
        const data: { ActivityName: string }[] = await apiFetch(
          `/ridb/recareas/${recAreaId}/activities`
        );

        const activityNames = data.map((a) => a.ActivityName);
        setActivities(activityNames);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      }
    };
    fetchActivities();
  }, [recAreaId]);

  useEffect(() => {
    if (!recAreaId) return;
    const fetchWeatherData = async () => {
      try {
        const data: {
          latitude: number;
          longitude: number;
        } = await apiFetch(`/ridb/recareas/${recAreaId}/coords`);

        const startDateStr = startDate.toISOString().split("T")[0];
        const endDateStr = endDate.toISOString().split("T")[0];

        const { latitude, longitude } = data;
        const weatherData: Weather[] = await apiFetch(
          `/weather?latitude=${latitude}&longitude=${longitude}&start_date=${startDateStr}&end_date=${endDateStr}&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,precipitation_sum,weathercode`
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
        setWeatherErr(false);
      } catch (err) {
        console.log(err);
        setWeatherErr(true);
      }
    };
    fetchWeatherData();
  }, [recAreaId]);

  const handleDateSelect = (date: Date) => {
    if (!activeActivity) return;

    setSelectedActivities((prev) => {
      const existing = prev.find((p) => p.name === activeActivity);

      let updated;
      if (!existing) {
        // Add a new activity with its first date
        updated = [...prev, { name: activeActivity, dates: [date] }];
      } else {
        //activity already exists update calendar
        const dateExists = existing.dates.some(
          (d) => d.toDateString() === date.toDateString()
        );

        const updatedDates = dateExists
          ? existing.dates.filter(
              (d) => d.toDateString() !== date.toDateString()
            )
          : [...existing.dates, date];

        updated = prev.map((p) =>
          p.name === activeActivity
            ? { name: activeActivity, dates: updatedDates }
            : p
        );
      }

      onChange({
        tripActivities: updated.map((a) => ({
          activityName: a.name,
          dates: a.dates,
        })),
      });

      return updated;
    });
  };

  const getActiveActivityDates = (): Date[] => {
    if (!activeActivity) return [];
    const activity = selectedActivities.find((a) => a.name === activeActivity);
    return activity ? activity.dates : [];
  };

  function findActivityDates(name: string): Date[] {
    const campground = selectedActivities.find((a) => a.name === name);
    return campground ? campground.dates : [];
  }

  return (
    <>
      <h2 className="text-black header-container">Set Activities & Dates</h2>
      <div className="text-dark overflow-auto inner-container rounded-3 flex-grow-1 mb-2">
        {activities.map((activity) => (
          <button
            key={activity}
            onClick={() => selectedActiveActivity(activity)}
            className="custom-btn"
          >
            {activity}
            <br />
            <small>
              {findActivityDates(activity)
                .map((d) => d.toLocaleDateString())
                .join(", ")}
            </small>
          </button>
        ))}
      </div>
      <div
        className="inner-container p-1 mb-2 text-black"
        style={{ flexDirection: "row", maxHeight: "300px" }}
      >
        <DayPicker
          key={activeActivity}
          mode="multiple"
          animate
          navLayout="around"
          month={startDate}
          disabled={(date) =>
            !activeActivity || date < startDate || date > endDate
          }
          onDayClick={handleDateSelect}
          selected={getActiveActivityDates()}
        />
        <div style={{ flex: 1, overflowY: "auto", marginLeft: "10px" }}>
          {weatherErr ? (
            <h3>No valid forecasts</h3>
          ) : weather.length > 0 ? (
            weather.map((w, index) => (
              <WeatherComponent
                key={index}
                weathercode={w.weathercode}
                windspeed={w.windspeed}
                temperature_max={w.temperature_max}
                temperature_min={w.temperature_min}
                date={w.date}
                precipitation={w.precipitation}
              />
            ))
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div>
    </>
  );
};
