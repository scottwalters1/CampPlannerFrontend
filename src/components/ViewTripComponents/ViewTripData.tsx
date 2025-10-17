import { useState, type JSX } from "react";
import type { Trip } from "../../models/trip";
import ViewActivities from "./ViewTripOverview/ViewActivities";
import ViewInvitedUsers from "./ViewTripOverview/ViewInvitedUsers";
import ViewTripDetails from "./ViewTripOverview/ViewTripDetails";
import '../../css/viewTripPage.css'
import ViewCampGrounds from "./ViewTripOverview/ViewCampGrounds";

interface ViewTripDetailsProps {
  trip: Trip;
}

const ViewTripData = ({trip}:ViewTripDetailsProps):JSX.Element => {

  const [tarDate, setTarDate] = useState<Date>(trip.startDate ?? new Date());

  return (
    <div className="basic-container view-trip-container" style={{flex:3}}>
      <ViewTripDetails tripName={trip.tripName} recName={trip.recAreaName} tripDescription={trip.tripDescription} startDate={trip.startDate} endDate={trip.endDate} onChange={setTarDate} selectedDate={tarDate} recAreaId={trip.recAreaId} />
      <ViewActivities activities={trip.tripActivities} targetDate={tarDate}/>
      <ViewCampGrounds campGrounds={trip.campGrounds} targetDate={tarDate}/>
      <ViewInvitedUsers invitedUsers={trip.invitedUsers} ownerUsername={trip.ownerUsername}/>
    </div>
  );
};

export default ViewTripData;
