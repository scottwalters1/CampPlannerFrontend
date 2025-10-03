import type { InvitedUser } from "./invitedUser";

export interface Trip{
    tripName:string;
    tripDescription:string;
    tripActivities:string[];
    recAreaName:string;
    recAreaId:number;
    ownerId:string;
    invitedUsers:InvitedUser[];
    startDate:Date;
    endDate:Date;
    tripId:string;

}