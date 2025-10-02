import { useState, type JSX } from "react";
import ViewTripItems from "../components/ViewTripItems";
import type { Trip } from "../models/trip";
import ViewTripData from "../components/ViewTripComponents/ViewTripData";

export const ViewTrip = (): JSX.Element => {
  const [selectedTripId, setSelectedTripId] = useState<string>(
    mockTrips[0].tripId
  );

  const selectedTrip = mockTrips.find((t) => t.tripId === selectedTripId);
  return (
    <div
      className="camp-bg"
      style={{ display: "flex", flexDirection: "row", width: "100%" }}
    >
      <div className="w-100 d-flex mx-auto p-3 me-5 ms-5">
        <ViewTripItems
          trips={mockTrips}
          handleClick={(e) => setSelectedTripId(e)}
        />
        <ViewTripData trip={selectedTrip!} />
      </div>
    </div>
  );
};

const mockTrips: Trip[] = [
  {
    tripId: "trip-101",
    tripName: "Get Out of Town",
    tripDescription:
      "Hikey Hills adventure Hikey Hills adventure Hikey Hills adventure Hikey Hills adventure Hikey Hills adventure",
    tripActivites: ["Hiking", "Picnic", "Photography"],
    recName: "Hikey Hills",
    recAreaId: 101,
    ownerId: "sa9dasu9021i",
    invitedUsers: [
      { username: "Alice", inviteStatus: "Accepted" },
      { username: "Bob", inviteStatus: "Pending" },
    ],
    startDate: new Date("2025-10-10"),
    endDate: new Date("2025-10-12"),
    isOwner: true,
  },
  {
    tripId: "trip-102",
    tripName: "Beach Weekend",
    tripDescription: "Relax by the sea",
    tripActivites: ["Swimming", "Surfing", "BBQ"],
    recName: "Sunny Shores",
    recAreaId: 102,
    ownerId: "2131husasda",
    invitedUsers: [
      { username: "Charlie", inviteStatus: "Denied" },
      { username: "Dana", inviteStatus: "Accepted" },
    ],
    startDate: new Date("2025-11-01"),
    endDate: new Date("2025-11-03"),
    isOwner: false,
  },
  {
    tripId: "trip-103",
    tripName: "Mountain Retreat",
    tripDescription: "Disconnect and unwind",
    tripActivites: ["Hiking", "Yoga", "Stargazing"],
    recName: "Rocky Peaks",
    recAreaId: 103,
    ownerId: "12391280",
    invitedUsers: [
      { username: "Eve", inviteStatus: "Pending" },
      { username: "Frank", inviteStatus: "Accepted" },
    ],
    startDate: new Date("2025-12-05"),
    endDate: new Date("2025-12-10"),
    isOwner: false,
  },
];
