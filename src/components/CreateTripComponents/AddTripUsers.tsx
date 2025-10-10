import { useState, type JSX } from "react";
import { UserItem } from "../Items/UserItem";
import type { Trip } from "../../models/trip";
import type { InvitedUser } from "../../models/invitedUser";
import { apiFetch } from "../../api/api";

interface AddTripUsersProps {
  onChange: (partial: Partial<Trip>) => void;
}

export const AddTripUsers = ({ onChange }: AddTripUsersProps): JSX.Element => {
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [userToAdd, setUserToAdd] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const inviteUser = async () => {
    const trimmed = userToAdd.trim();
    if (!trimmed || invitedUsers.find((u) => u.username === trimmed)) return;
    try {
      setError(null);

      const newUser = await apiFetch("/users/" + trimmed, { method: "GET" });

      if (!newUser) {
        setError("User not found");
        return;
      }

      const newUserID = newUser.PK;

      const newInvitedUser: InvitedUser = {
        username: newUser.username,
        userID: newUserID,
        inviteStatus: "Pending",
      };

      console.log(newInvitedUser);
      const updated = [...invitedUsers, newInvitedUser];

      setInvitedUsers(updated);
      setUserToAdd("");
      onChange({ invitedUsers: updated });
    } catch (err) {
      console.error(err);
      setError("Failed to find user. Please try again.");
    }
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

      {error && <div className="text-danger mt-2">{error}</div>}

      <div className="overflow-auto inner-container my-2 rounded-3 flex-grow-1 text-black p-3">
        {invitedUsers.map((user) => (
          <UserItem key={user.username} name={user.username} />
        ))}
      </div>
    </>
  );
};
