import { useState, type JSX } from "react";
import ViewTripItems from "../components/ViewTripComponents/ViewTripItems";
import type { Trip } from "../models/trip";
import ViewTripData from "../components/ViewTripComponents/ViewTripData";
import { useEffect } from "react";
import { apiFetch } from "../api/api";

export const ViewTrip = (): JSX.Element => {
  const [selectedTripId, setSelectedTripId] = useState<string>();

  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchMyTrips = async () => {
      try {
        const data = (await apiFetch(`/trips/`)) as Trip[];

        const mappedTrips: Trip[] = data.map((trip) => ({
          tripId: trip.tripId,
          tripName: trip.tripName,
          tripDescription: trip.tripDescription,
          tripActivities: (trip.tripActivities || []).map((a) => ({
            activityName: a.activityName,
            dates: (a.dates || []).map((d) => new Date(d)),
          })),
          campGrounds: (trip.campGrounds || []).map((c) => ({
            campgroundName: c.campgroundName,
            dates: (c.dates || []).map((d) => new Date(d)),
          })),
          recAreaName: trip.recAreaName,
          recAreaId: trip.recAreaId,
          ownerId: trip.ownerId,
          invitedUsers: (trip.invitedUsers || []).map((u) => ({
            userID: u.userID,
            username: u.username,
            inviteStatus: u.inviteStatus,
          })),
          startDate: trip.startDate ? new Date(trip.startDate) : undefined,
          endDate: trip.endDate ? new Date(trip.endDate) : undefined,
        }));

        setTrips(mappedTrips);
      } catch (err) {
        console.error("Failed to fetch trips:", err);
      }
    };

    fetchMyTrips();
  }, []);

  const selectedTrip = trips.find((t) => t.tripId === selectedTripId);

  return (
    <div
      className="camp-bg"
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div className="w-75 p-3 d-flex" style={{ height: "90%" }}>
        <ViewTripItems
          trips={trips}
          handleClick={(e) => setSelectedTripId(e)}
        />
       <ViewTripData trip={selectedTrip ?? emptyTrip} />
      </div>
    </div>
  );
};

const emptyTrip: Trip = {
  tripId: "",
  tripName: "Select A Trip!",
  tripDescription: "",
  tripActivities: [],
  campGrounds: [],
  recAreaName: "",
  recAreaId: 0,
  ownerId: "",
  invitedUsers: [],
  startDate: new Date(0),
  endDate: new Date(0),
};