import type { JSX } from "react";

interface AcitivtyItemProps {
  name: string;
}

export const ActivityItem = ({ name }: AcitivtyItemProps): JSX.Element => {
  return (
    <div style={{display:"flex", justifyContent:"space-between"}} className="sub-container my-2 rounded-3 p-2">
      <h5 className="">{name}</h5>
      <button className="btn btn-secondary" style={{margin: 5}}>Add</button>
    </div>
  );
};
