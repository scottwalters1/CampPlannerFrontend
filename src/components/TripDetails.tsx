import type { JSX } from "react";
import "../css/createtrip.css";

interface TripDetailsProps{
  onNext: ()=> void;
}

export const TripDetails = ({onNext}: TripDetailsProps): JSX.Element => {
    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault();
        onNext();
    }
  return (
    <form className="main camp-bg" onSubmit={handleSubmit}>
      <div className="tripDetails rounded-3 basic-container-bg">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Trip Name Here"
          />
          <textarea
            className="form-control"
            placeholder="Enter Description Here"
            style={{height: 200}}
          />
          <button className="btn btn-primary">Next</button>
      </div>
    </form>
  );
};
