import { useState, type JSX } from "react";
import { apiFetch } from "../../api/api";
import type { Trip } from "../../models/trip";

interface TripFacilityProps {
  onChange: (data: Partial<Trip>) => void;
}

// probably rename to recArea
export const TripFacility = ({ onChange }: TripFacilityProps): JSX.Element => {
  const [facilities, setFacilities] = useState<
    { RecAreaName: string; RecAreaID: string }[]
  >([]);
  const [query, setQuery] = useState("");
  const [selectedFacility, setSelectedFacility] = useState<{
    RecAreaName: string;
    RecAreaID: string;
  } | null>(null);

  const handleSearch = async () => {
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
      <h2 className="text-black header-container">Find a Recreational Area</h2>
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
          return (
            <button
              key={facility.RecAreaID}
              onClick={() => handleSelect(facility)}
              className="custom-btn"
            >
              {facility.RecAreaName}
            </button>
          );
        })}
      </div>
    </>
  );
};
