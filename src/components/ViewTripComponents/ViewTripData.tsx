import type { JSX } from "react";
import type { Trip } from "../../models/trip";
import ViewActivities from "./ViewTripOverview/ViewActivities";
import ViewInvitedUsers from "./ViewTripOverview/ViewInvitedUsers";
import ViewTripDetails from "./ViewTripOverview/ViewTripDetails";

interface ViewTripDetailsProps {
  trip: Trip;
}

const ViewTripData = ({trip}:ViewTripDetailsProps):JSX.Element => {
  return (
    <div className="basic-container d-flex" style={{ flex: 4, margin: 20, justifyContent:"space-between" }}>
      <ViewTripDetails tripName={trip.tripName} recName={trip.recName} tripDescription={trip.tripDescription} startDate={trip.startDate} endDate={trip.endDate} />
      <ViewActivities activities={trip.tripActivites}/>
      <ViewInvitedUsers invitedUsers={trip.invitedUsers}/>
    </div>
  );
};

export default ViewTripData;
