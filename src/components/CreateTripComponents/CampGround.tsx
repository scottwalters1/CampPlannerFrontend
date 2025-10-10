import { useEffect, useState, type JSX } from "react";
import type { Trip } from "../../models/trip";
import { apiFetch } from "../../api/api";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

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
}: TripCampGroundsProps): JSX.Element => {
  const [campGrounds, setCampgrounds] = useState<string[]>([]);
  const [selectedCampGrounds, setSelectedCampGrounds] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  useEffect(() => {
    if (!recAreaId) return;

    const fetchCampGrounds = async () => {
      try {
        const data: { FacilityName: string }[] = await apiFetch(
          `/ridb/recareas/${recAreaId}/campgrounds`
        );

        const campGroundNames = data.map((a: any) => a.FacilityName);
        setCampgrounds(campGroundNames);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      }
    };

    fetchCampGrounds();
  }, [recAreaId]);

  const handleDateSelect = (date: Date) => {
    setSelectedDates((prev) => {
      const exists = prev.some((d) => d.toDateString() === date.toDateString());
      const updated = exists
        ? prev.filter((d) => d.toDateString() !== date.toDateString())
        : [...prev, date];
      return updated;
    });
  };

  const handleAddCampgrounds = (campground: string) => {
    if (!selectedCampGrounds.includes(campground)) {
      const updated = [...selectedCampGrounds, campground];
      setSelectedCampGrounds(updated);

      const campGrounds = updated.map((name) => ({
        campgroundName: name,
        dates: selectedDates,
      }));

      onChange({ campGrounds });
    }
  };

  return (
    <>
      <h2 className="text-black header-container">Select Campgrounds</h2>
      <div className="text-dark overflow-auto inner-container rounded-3 flex-grow-1 mb-2">
        {campGrounds.map((campground, index) => (
          <button
            key={index}
            onClick={() => handleAddCampgrounds(campground)}
            className="custom-btn"
          >
            {campground}
          </button>
        ))}
      </div>
      <div
        className="inner-container text-black p-1 mb-2"
        style={{ alignItems: "center" }}
      >
        <DayPicker
          mode="multiple"
          animate
          navLayout="around"
          month={startDate}
          disabled={{ before: startDate, after: endDate }}
          onDayClick={handleDateSelect}
          selected={selectedDates}
        />
      </div>
    </>
  );
};
