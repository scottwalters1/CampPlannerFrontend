import type { JSX } from "react";

interface FacilityItemProps {
  name: string;
  onClick: () => void;
}

export const FacilityItem = ({ name, onClick }: FacilityItemProps): JSX.Element => {
  return (
    <div
      className="facility-item p-2 border-bottom text-black"
      role="button"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {name}
    </div>
  );
};