type InviteStatus = "Accepted" | "Denied" | "Pending";

export interface InvitedUser{
    username:string;
    userID: string;
    inviteStatus:InviteStatus;
}
