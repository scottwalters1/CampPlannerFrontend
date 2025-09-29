import { useState, type JSX } from "react";
import { FacilityItem } from "./FacilityItem";

interface TripFacilityProps {
  onNext: () => void;
}

export const TripFacility = ({ onNext }: TripFacilityProps): JSX.Element => {
  const [facilities, setFacilities] = useState<string[]>([]);

  const handleSubmit = () => {
    onNext();
  };

  const handleSearch = () => {
    setFacilities(mockFacilities);
  };

  return (
    <div className="main camp-bg">
      <div className="tripDetails rounded-3 basic-container-bg">
        <div style={{ display: "flex" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Location"
          />
          <button className="btn btn-secondary" onClick={handleSearch}>Search</button>
        </div>
        <div className="form-control overflow-auto" style={{ height: 200}}>
          {facilities.map((facility) => (
            <FacilityItem key={facility} name={facility} />
          ))}
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
};

const mockFacilities: string[] = [
  "Pine Ridge Camp",
  "Willow Creek",
  "Bear Hollow",
    "Pine Ridge Camp",
  "Willow Creek",
  "Bear Hollow",
    "Pine Ridge Camp",
  "Willow Creek",
  "Bear Hollow",
    "Pine Ridge Camp",
  "Willow Creek",
  "Bear Hollow",
];
