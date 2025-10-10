import type { JSX } from "react";

interface UserItemProps{
    name: string
}

export const UserItem = ({name}:UserItemProps):JSX.Element =>{
    
    return(
        <div style={{display:"flex", justifyContent:"space-between"}} className="sub-container p-2 rounded-3 my-2">
            <div>{name}</div>
            <div className="text-warning fw-bold">PENDING</div>
        </div>
    )
}