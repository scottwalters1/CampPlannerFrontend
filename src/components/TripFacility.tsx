import { useState, type JSX } from "react";
import { FacilityItem } from "./FacilityItem";

export const TripFacility = (): JSX.Element => {
  const [facilities, setFacilities] = useState<string[]>([]);

  const handleSearch = () => {
    setFacilities(mockFacilities);
  };

  return (
    <>
    <h2 className="text-black">Find a Recreational Area</h2>
      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter Location"
        />
        <button className="btn btn-secondary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="text-black inner-container overflow-auto flex-grow-1 my-2">
        {facilities.map((facility) => (
          <FacilityItem key={facility} name={facility} />
        ))}
      </div>
    </>
  );
};

const mockFacilities: string[] = [
  "Pine Ridge Camp",
  "Willow Creek",
  "Bear Hollow",
  "Pine Ridge Camp1",
  "Willow Creek2",
  "Bear Hollow3",
  "Pine Ridge Camp4",
  "Willow Creek5",
  "Bear Hollow6",
  "Pine Ridge Camp7",
  "Willow Creek8",
  "Bear Hollow9",
];
