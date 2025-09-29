import type { JSX } from "react";

interface AddUsersProps {
  onNext: () => void;
}

export const AddTripUsers = ({ onNext }: AddUsersProps): JSX.Element => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="main camp-bg" onSubmit={handleSubmit}>
      <div className="tripDetails rounded-3 basic-container-bg">
        <div style={{ display: "flex" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Add Username"
          />
          <button className="btn btn-secondary">Invite</button>
        </div>
        <button className="btn btn-primary">Finalize Trip</button>
      </div>
    </div>
  );
};
