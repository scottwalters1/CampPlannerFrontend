import type { JSX } from "react";
import type { Trip } from "../models/trip";
import TripItem from "./Items/TripItem";

interface ViewTripProps{
    trips:Trip[];
    handleClick: (tripId:string) => void;
}

const ViewTripItems = ({trips, handleClick}:ViewTripProps) :JSX.Element => {
  return (
    <div
      className="basic-container d-flex flex-column p-3"
      style={{ flex: 2, margin: 20, textAlign: "center" }}
    >
      <h1>Trips</h1>
      <div className="inner-container d-flex flex-column p-3 overflow-auto flex-grow-1">
          {trips.map((t, index) => (
            <TripItem key={index} name={t.tripName} destination={t.recName} handleClick={() => handleClick(t.tripId)}/>
          ))}
      </div>
    </div>
  );
}

export default ViewTripItems


