type InviteStatus = "Accepted" | "Denied" | "Pending";

export interface InvitedUser{
    username:string;
    inviteStatus:InviteStatus;
}
