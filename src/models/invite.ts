type InviteStatus = "Accepted" | "Denied" | "Pending";

export interface Invite {
  tripId: string; // needed
  tripName: string; // needed
  tripDescription: string; // needed
  recAreaName: string;
  invitedUsername: string;
  inviteStatus: InviteStatus;
  ownerId: string; // get username from this
  createdAt: number;
  SK: string;
}

// PICKUP: hook up buttons to fetch update endpoint

