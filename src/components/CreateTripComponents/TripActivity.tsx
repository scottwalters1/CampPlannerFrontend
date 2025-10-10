import { useEffect, useState, type JSX } from "react";
import type { Trip } from "../../models/trip";
import { apiFetch } from "../../api/api";
import { DayPicker } from "react-day-picker";

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
}: TripActivityProps): JSX.Element => {
  const [activities, setActivities] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

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

  const handleDateSelect = (date: Date) => {
    setSelectedDates((prev) => {
      const exists = prev.some((d) => d.toDateString() === date.toDateString());
      const updated = exists
        ? prev.filter((d) => d.toDateString() !== date.toDateString())
        : [...prev, date];
      return updated;
    });
  };

  const handleAddActivity = (activity: string) => {
    if (!selectedDates) return;
    if (!selectedActivities.includes(activity)) {
      const updated = [...selectedActivities, activity];
      setSelectedActivities(updated);

      const tripActivities = updated.map((name) => ({
        activityName: name,
        dates: selectedDates,
      }));

      onChange({ tripActivities });
    }
  };

  return (
    <>
      <h2 className="text-black header-container">Select Activities</h2>
      <div className="text-dark overflow-auto inner-container rounded-3 flex-grow-1 mb-2">
        {activities.map((activity) => (
          <button
            key={activity}
            onClick={() => handleAddActivity(activity)}
            className="custom-btn"
          >
            {activity}
          </button>
        ))}
      </div>
      <div
        className="inner-container p-1 mb-2 text-black"
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
