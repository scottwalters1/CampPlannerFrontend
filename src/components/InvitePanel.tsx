import React, { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch } from "../api/api";
import { useAuth } from "../context/AuthContext";
import type { Invite } from "../models/invite";
import { InviteListItem } from "./InvitePanelComponents/InviteListItem";

interface InvitePanelProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
}

export const InvitePanel: React.FC<InvitePanelProps> = ({
  anchorRef,
  onClose,
}) => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const { user } = useAuth();
  const panelRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const fetchInvites = async () => {
  //     try {
  //       if (user) {
  //         const data = await apiFetch("/trips/invites", {
  //           method: "GET",
  //         });
  //         // tripName, description - tracking down, trip owner name
  //         setInvites(data);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch invites", error);
  //     }
  //   };

  //   fetchInvites();
  // }, [user]);
  const fetchInvites = useCallback(async () => {
    if (!user) return;
    try {
      const data = await apiFetch("/trips/invites", { method: "GET" });
      setInvites(data);
    } catch (error) {
      console.error("Failed to fetch invites", error);
    }
  }, [user]);

  useEffect(() => {
    fetchInvites();
  }, [fetchInvites]);

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8, // slightly below the navbar
        left: rect.right - 280, // align to right edge (assuming width 280)
      });
    }
  }, [anchorRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [anchorRef, onClose]);

  return (
    <div
      ref={panelRef}
      className="invite-panel"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 999,
      }}
    >
      {user ? (
        <>
          <h4>Invites for {user.username}</h4>
          {invites.length > 0 ? (
            <ul>
              {invites.map((invite) => (
                <li key={invite.tripId}>
                  <InviteListItem invite={invite} onActionComplete={fetchInvites}/>
                </li>
              ))}
            </ul>
          ) : (
            <p>No invites.</p>
          )}
        </>
      ) : (
        <p>No user logged in.</p>
      )}
    </div>
  );
};
