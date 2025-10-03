import { useState, type JSX } from "react";
import { UserItem } from "./UserItem";
import type { Trip } from "../models/trip";
import type { InvitedUser } from "../models/invitedUser";

interface AddTripUsersProps {
  onChange: (partial: Partial<Trip>) => void;
}

export const AddTripUsers = ({ onChange }: AddTripUsersProps): JSX.Element => {
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [userToAdd, setUserToAdd] = useState<string>("");

  const inviteUser = () => {
    const trimmed = userToAdd.trim();
    if (!trimmed || invitedUsers.find(u => u.username === trimmed)) return;

    const newUser: InvitedUser = { username: trimmed, inviteStatus: "Pending" };
    const updated = [...invitedUsers, newUser];

    setInvitedUsers(updated);
    setUserToAdd("");

    onChange({ invitedUsers: updated });
  };

  return (
    <>
    <h2 className="text-black">Invite Users</h2>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Add Username"
            value={userToAdd}
            onChange={(e) => setUserToAdd(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={inviteUser}>
            Invite
          </button>
        </div>
        <div className="overflow-auto inner-container my-2 rounded-3 flex-grow-1 text-black p-3">
          {invitedUsers.map((user) => (
            <UserItem key={user.username} name={user.username} />
          ))}
        </div>
      </>
  );
};
