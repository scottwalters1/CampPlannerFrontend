import { useState, type JSX } from "react";
import type { Trip } from "../../models/trip";
import { DayPicker, type DateRange } from "react-day-picker";
interface TripDetailsProps {
  onChange: (data: Partial<Trip>) => void;
  isDisabled: (v: boolean) => void;
}

export const TripDetails = ({ onChange, isDisabled}: TripDetailsProps): JSX.Element => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

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

  const handleRangeChange = (dateRange: DateRange | undefined) => {
    if (!dateRange) return;
    setRange(dateRange);
    onChange({ startDate: dateRange.from, endDate: dateRange.to });
    isDisabled(false);
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <h2 className="text-black header-container">Set Trip Details</h2>
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
      <div className="inner-container text-black" style={{alignItems:"center"}}>
        <DayPicker
          mode="range"
          animate
          navLayout="around"
          onSelect={handleRangeChange}
          selected={range}
          disabled={{before: new Date()}}
        />
      </div>
    </div>
  );
};
