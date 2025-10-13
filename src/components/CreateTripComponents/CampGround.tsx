import { useEffect, useState } from "react";
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
}: TripCampGroundsProps) => {
  const [campgrounds, setCampgrounds] = useState<string[]>([]);
  const [selectedCampGrounds, setSelectedCampGrounds] = useState<
    { name: string; dates: Date[] }[]
  >([]);
  const [activeCampground, setActiveCampground] = useState<string | null>(null);

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
    if (!activeCampground) return; // can't pick new dates if no campground

    setSelectedCampGrounds((prev) => {
      const campgroundWithDates = prev.find(
        (c) => c.name === activeCampground
      )!;

      if (!campgroundWithDates) {
        // Add new campground with this date
        const updated = [...prev, { name: activeCampground, dates: [date] }];
        onChange({
          campGrounds: updated.map((c) => ({
            campgroundName: c.name,
            dates: c.dates,
          })),
        });
        return updated;
      } else {
        const dateExists = campgroundWithDates.dates.some(
          (d) => d.toDateString() === date.toDateString()
        );

        const updatedDates = dateExists
          ? campgroundWithDates.dates.filter(
              (d) => d.toDateString() !== date.toDateString()
            )
          : [...campgroundWithDates.dates, date];

        const updated = prev.map((c) =>
          c.name === activeCampground
            ? { name: activeCampground, dates: updatedDates }
            : c
        );

        onChange({
          campGrounds: updated.map((c) => ({
            campgroundName: c.name,
            dates: c.dates,
          })),
        });

        return updated;
      }
    });
  };

  const getActiveCampgroundDates = (): Date[] => {
    if (!activeCampground) return [];
    const campground = selectedCampGrounds.find(
      (c) => c.name === activeCampground
    );
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
            className={`custom-btn ${
              activeCampground === campground ? "active" : ""
            }`}
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
        className="inner-container text-black p-1 mb-2"
        style={{ alignItems: "center" }}
      >
        <DayPicker
          key={activeCampground}
          mode="multiple"
          navLayout="around"
          animate
          month={startDate}
          onDayClick={handleDateSelect}
          selected={getActiveCampgroundDates()}
          disabled={(date) =>
            !activeCampground || date < startDate || date > endDate
          }
        />
      </div>
    </>
  );
};
