import React, { type JSX } from 'react'

interface TripItemProps{
    name: string;
    destination: string;
    handleClick: () => void;
}

const TripItem = ({name, destination, handleClick}:TripItemProps):JSX.Element => {
  return (
    <button className="btn btn-primary m-1" onClick={handleClick}>
        <h6>{name} : {destination}</h6>
    </button>
  )
}

export default TripItem