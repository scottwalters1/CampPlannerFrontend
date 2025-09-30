import type { JSX } from "react";

export const TripDetails = (): JSX.Element => {
  return (
    <div className="d-flex flex-column flex-grow-1">
      <h2 className="text-black">Trip Details</h2>
      <input
        id="TripName"
        type="text"
        className="form-control"
        placeholder="Enter Trip Name Here"
      />
      <textarea
        id="TripDescription"
        className="form-control flex-grow-1 mt-2 mb-2"
        placeholder="Enter Description Here"
      />
    </div>
  );
};
