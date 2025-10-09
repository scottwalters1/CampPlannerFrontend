import { useEffect, useState, type JSX } from "react";
import { ActivityItem } from "./ActivityItem";
import type { Trip } from "../models/trip";
import { apiFetch } from "../api/api";

interface TripCampGroundsProps {
  recAreaId?: number;
  onChange: (partial: Partial<Trip>) => void;
}



export const TripCampground = ({
  recAreaId,
  onChange,
}: TripCampGroundsProps): JSX.Element => {
  const [campGrounds, setCampgrounds] = useState<string[]>([]);
  const [selectedCampGrounds, setSelectedCampGrounds] = useState<string[]>([]);

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

  const handleAddActivity = (campground: string) => {
    if (!selectedCampGrounds.includes(campground)) {
      const updated = [...selectedCampGrounds, campground];
      setSelectedCampGrounds(updated);

      const campGrounds = updated.map((name) => ({
        campgroundName: name,
        dates: [],
      }));

      onChange({ campGrounds });
    }
  };

  return (
    <>
      <h2 className="text-black">Select Campgrounds</h2>
      <div className="text-dark overflow-auto inner-container rounded-3 flex-grow-1 mb-3 p-3">
        {campGrounds.map((campground, index) => (
          <ActivityItem
            name={campground}
            key={index}
            onClick={() => handleAddActivity(campground)}
          />
        ))}
      </div>
    </>
  );
};
