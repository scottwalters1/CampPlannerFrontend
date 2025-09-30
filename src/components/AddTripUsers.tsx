import { useState, type JSX } from "react";
import { UserItem } from "./UserItem";


export const AddTripUsers = (): JSX.Element => {
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);
  const [userToAdd, setUserToAdd] = useState<string>("");

  const inviteUser = () => {
    if (!userToAdd.trim()) return;

    setInvitedUsers((prev) => [...prev, userToAdd]);
    setUserToAdd("");
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
          {invitedUsers.map((u) => (
            <UserItem key={u} name={u} />
          ))}
        </div>
      </>
  );
};
