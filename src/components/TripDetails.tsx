import type { JSX } from "react";
import type { Trip } from "../models/trip";

interface TripDetailsProps {
  onChange: (data: Partial<Trip>) => void;
}

export const TripDetails = ({ onChange }: TripDetailsProps): JSX.Element => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange({ tripName: value }); 
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    onChange({ tripDescription: value }); 
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : undefined;
    if (date) onChange({ startDate: date });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : undefined;
    if (date) onChange({ endDate: date });
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <h2 className="text-black">Trip Details</h2>
      <input
        id="TripName"
        type="text"
        className="form-control"
        placeholder="Enter Trip Name Here"
        onChange={handleNameChange}
      />
      <textarea
        id="TripDescription"
        className="form-control flex-grow-1 mt-2 mb-2"
        placeholder="Enter Description Here"
        onChange={handleDescriptionChange}
      />
      <div className="m-2 d-flex justify-content-evenly">
        <label className="text-black">Start:</label>
        <input type="date" onChange={handleStartDateChange}/>
        <label className="text-black">End:</label>
        <input type="date" onChange={handleEndDateChange}/>
      </div>
    </div>
  );
};
