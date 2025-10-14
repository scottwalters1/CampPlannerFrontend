import type { Activities } from "./activities";
import type { Campgrounds } from "./campgrounds";
import type { InvitedUser } from "./invitedUser";

export interface Trip{
    tripName:string;
    tripDescription:string;
    tripActivities:Activities[];
    campGrounds:Campgrounds[];
    recAreaName:string;
    recAreaId:number;
    ownerId:string;
    invitedUsers:InvitedUser[];
    startDate:Date | undefined;
    endDate:Date | undefined;
    tripId:string;
}