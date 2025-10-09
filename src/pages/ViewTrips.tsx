import { useState, type JSX } from "react";
import ViewTripItems from "../components/ViewTripComponents/ViewTripItems";
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
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        className="w-75 p-3 d-flex"
      >
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate, sem nec elementum iaculis, urna risus aliquam magna, sed efficitur magna lectus nec sapien. Sed feugiat viverra ligula, eget porta metus blandit ac. Integer ut eros nec purus iaculis ultricies. Nullam condimentum, tortor nec scelerisque porttitor, nisl massa aliquet eros, a pulvinar lorem nibh vitae enim. Proin consequat nisi et dolor tincidunt porta. Suspendisse potenti. Ut feugiat diam sed magna iaculis, nec interdum est mattis. Vivamus id quam nec metus tincidunt gravida. Mauris pharetra laoreet purus, non tincidunt urna malesuada ac.",
    tripActivities: [
      { activityName: "Hiking", dates: [new Date("2025-10-10")] },
      { activityName: "Picnic", dates: [new Date("2025-10-11")] },
      { activityName: "Photography", dates: [new Date("2025-10-12")] },
    ],
    campGrounds: [
      { campgroundName: "Hilltop Camp", dates: [new Date("2025-10-10"), new Date("2025-10-12")] },
    ],
    recAreaName: "Hikey Hills",
    recAreaId: 101,
    ownerId: "sa9dasu9021i",
    invitedUsers: [
      { username: "Alice", inviteStatus: "Accepted" },
      { username: "Bob", inviteStatus: "Pending" },
    ],
    startDate: new Date("2025-10-10"),
    endDate: new Date("2025-10-12"),
  },
  {
    tripId: "trip-102",
    tripName: "Beach Weekend",
    tripDescription: "Relax by the sea",
    tripActivities: [
      { activityName: "Swimming", dates: [new Date("2025-11-01")] },
      { activityName: "Surfing", dates: [new Date("2025-11-02")] },
      { activityName: "BBQ", dates: [new Date("2025-11-03")] },
    ],
    campGrounds: [
      { campgroundName: "Sunny Beachside", dates: [new Date("2025-11-01"), new Date("2025-11-03")] },
    ],
    recAreaName: "Sunny Shores",
    recAreaId: 102,
    ownerId: "2131husasda",
    invitedUsers: [
      { username: "Charlie", inviteStatus: "Denied" },
      { username: "Dana", inviteStatus: "Accepted" },
    ],
    startDate: new Date("2025-11-01"),
    endDate: new Date("2025-11-03"),
  },
  {
    tripId: "trip-103",
    tripName: "Mountain Retreat",
    tripDescription: "Disconnect and unwind",
    tripActivities: [
      { activityName: "Hiking", dates: [new Date("2025-12-05")] },
      { activityName: "Yoga", dates: [new Date("2025-12-07")] },
      { activityName: "Stargazing", dates: [new Date("2025-12-09")] },
    ],
    campGrounds: [
      { campgroundName: "Rocky Ridge Basecamp", dates: [new Date("2025-12-05"), new Date("2025-12-10")] },
    ],
    recAreaName: "Rocky Peaks",
    recAreaId: 103,
    ownerId: "12391280",
    invitedUsers: [
      { username: "Eve", inviteStatus: "Pending" },
      { username: "Frank", inviteStatus: "Accepted" },
    ],
    startDate: new Date("2025-12-05"),
    endDate: new Date("2025-12-10"),
  },
];
