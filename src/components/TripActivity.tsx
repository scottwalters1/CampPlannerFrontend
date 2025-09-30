import { useEffect, useState, type JSX } from "react";
import { ActivityItem } from "./ActivityItem";

export const TripActivity = (): JSX.Element => {
  const [activities, setActivities] = useState<string[]>([]);

  useEffect(() => {
    setActivities(mockActivities);
  }, []);

  return (
      <>
         <h2 className="text-black">Select Activities</h2>
        <div className="text-dark overflow-auto inner-container rounded-3 flex-grow-1 mb-3 p-3">
          {activities.map((activities) => (
            <ActivityItem name={activities} key={activities} />
          ))}
        </div>
      </>
  );
};

const mockActivities = ["Mountain Biking", "Farming", "Kayaking", "Hiking"];
