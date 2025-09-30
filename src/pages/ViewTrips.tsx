import type { JSX } from "react";

export const ViewTrip = ():JSX.Element => (
    <div className="camp-bg" style={{display:"flex", flexDirection: "row", width: "100%"}}>
        <div className="basic-container rounded-3" style={{flex:1, margin:40}}>Trips</div>
        <div className="basic-container rounded-3" style={{flex:4, margin:40}}>Details</div>
    </div>
)