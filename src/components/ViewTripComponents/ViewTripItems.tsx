import type { JSX } from "react";
import type { Trip } from "../../models/trip";
import TripItem from "../Items/TripItem";

interface ViewTripProps{
    trips:Trip[];
    handleClick: (tripId:string) => void;
}

const ViewTripItems = ({trips, handleClick}:ViewTripProps) :JSX.Element => {
  return (
    <div
      className="basic-container flex-column p-3 d-flex"
      style={{ textAlign: "center", flex:1, marginRight:10}}
    >
      <h3 className="header-container">Trips</h3>
      <div className="inner-container flex-column p-3 overflow-auto d-flex flex-grow-1">
          {trips.map((t, index) => (
            <TripItem key={index} name={t.tripName} destination={t.recAreaName} handleClick={() => handleClick(t.tripId)}/>
          ))}
      </div>
    </div>
  );
}

export default ViewTripItems


