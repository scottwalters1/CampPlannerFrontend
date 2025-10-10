import type { JSX } from "react";

interface ActivityItemProps {
  name: string;
  onClick?: () => void;
}

export const ActivityItem = ({ name, onClick }: ActivityItemProps): JSX.Element => {
  return (
    <div style={{display:"flex", justifyContent:"space-between"}} className="sub-container my-2 rounded-3 p-2">
      <h5 className="">{name}</h5>
      <button className="btn btn-secondary" style={{margin: 5}} onClick={onClick}>Add</button>
    </div>
  );
};
