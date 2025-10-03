import { useState, type JSX } from "react";
import { FacilityItem } from "./FacilityItem";
import { apiFetch } from "../api/api";
import type { Trip } from "../models/trip";

interface TripFacilityProps {
  onChange: (data: Partial<Trip>) => void;
}

// probably rename to recArea
export const TripFacility = ({ onChange }: TripFacilityProps): JSX.Element => {
  const [facilities, setFacilities] = useState<
    { RecAreaName: string; RecAreaID: string }[]
  >([]);
  const [query, setQuery] = useState("");
    const [selectedFacility, setSelectedFacility] = useState<{ RecAreaName: string; RecAreaID: string } | null>(null);

  const handleSearch = async () => {
    // setFacilities(mockFacilities);

    if (!query.trim()) return;
    try {
      const data = await apiFetch(
        `/ridb/recareas?query=${encodeURIComponent(query)}`
      );
      console.log("API data:", data);
      setFacilities(data);
    } catch (err) {
      console.error("Failed to fetch facilities", err);
    }
  };

  const handleSelect = (facility: {
    RecAreaName: string;
    RecAreaID: string;
  }) => {
    setSelectedFacility(facility);
    console.log(selectedFacility);
    onChange({
      recAreaName: facility.RecAreaName,
      recAreaId: parseInt(facility.RecAreaID),
    });
  };

  return (
    <>
      <h2 className="text-black">Find a Recreational Area</h2>
      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="text-black inner-container overflow-auto flex-grow-1 my-2">
        {facilities.map((facility) => {
          const isSelected = selectedFacility?.RecAreaID === facility.RecAreaID;
          return (
            <FacilityItem
            key={facility.RecAreaID}
            name={facility.RecAreaName}
            onClick={() => handleSelect(facility)}
          />);
        })}
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
