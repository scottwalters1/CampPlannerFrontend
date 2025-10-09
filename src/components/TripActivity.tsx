import { useEffect, useState, type JSX } from "react";
import { ActivityItem } from "./ActivityItem";
import type { Trip } from "../models/trip";
import { apiFetch } from "../api/api";

interface TripActivityProps {
  recAreaId?: number;
  onChange: (partial: Partial<Trip>) => void;
}

export const TripActivity = ({
  recAreaId,
  onChange,
}: TripActivityProps): JSX.Element => {
  const [activities, setActivities] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

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

  const handleAddActivity = (activity: string) => {
    if (!selectedActivities.includes(activity)) {
      const updated = [...selectedActivities, activity];
      setSelectedActivities(updated);

      const tripActivities = updated.map((name) => ({
        activityName: name,
        dates: [],
      }));

      onChange({ tripActivities });
    }
  };

  return (
    <>
      <h2 className="text-black">Select Activities</h2>
      <div className="text-dark overflow-auto inner-container rounded-3 flex-grow-1 mb-3 p-3">
        {activities.map((activity) => (
          <ActivityItem
            name={activity}
            key={activity}
            onClick={() => handleAddActivity(activity)}
          />
        ))}
      </div>
    </>
  );
};
