import { useEffect, useState } from "react";
import type { Invite } from "../../models/invite";
import { apiFetch } from "../../api/api";

interface InviteListItemProps {
  invite: Invite;
  onActionComplete: () => void;
}

interface User {
  PK: string;
  username: string;
  // add any other fields you want from the user object
}

export const InviteListItem: React.FC<InviteListItemProps> = ({
  invite,
  onActionComplete,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // clear invite when accepted or denied
  useEffect(() => {
    async function fetchUser() {
      console.log(invite);
      try {
        const userId = invite.ownerId;
        const encodedId = encodeURIComponent(userId);
        const data = await apiFetch(`/users/id/${encodedId}`);
        setUser(data);
      } catch (err: any) {
        console.error(err);
      }
    }

    fetchUser();
  }, [invite.ownerId]);

  async function handleResponse(status: "Accepted" | "Denied") {
    try {
      await apiFetch(`/trips/invites/${invite.tripId}`, {
        method: "PATCH",
        body: { status },
      });
      alert(`Invite ${status}.`);
      onActionComplete();
    } catch (err: any) {
      console.error("Failed to update invite:", err);
      alert("Something went wrong updating the invite.");
    }
  }

  return (
    <>
      <h3>Trip Name: {invite.tripName}</h3>
      <p>Invitation from: {user?.username}</p>
      <div>
        <button className="btn btn-primary" onClick={() => handleResponse("Accepted")}>Accept</button>
        <button className="btn btn-danger" onClick={() => handleResponse("Denied")}>Deny</button>
      </div>
    </>
  );
};
