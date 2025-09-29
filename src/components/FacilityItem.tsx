import type { JSX } from "react";

interface FacilityItemProps {
  name: string;
}

export const FacilityItem = ({ name }: FacilityItemProps): JSX.Element => {
  return (
    <div style={{display:"flex", justifyContent:"space-between"}}>
      <h5>{name}</h5>
      <button className="btn btn-secondary" style={{margin: 5}}>Set</button>
    </div>
  );
};
