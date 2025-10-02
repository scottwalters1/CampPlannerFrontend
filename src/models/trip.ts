import type { InvitedUser } from "./invitedUser";

export interface Trip{
    tripName:string;
    tripDescription:string;
    tripActivites:string[];
    recName:string;
    recAreaId:number;
    ownerId:string;
    invitedUsers:InvitedUser[];
    startDate:Date;
    endDate:Date;
    isOwner:boolean;
    tripId:string;

}