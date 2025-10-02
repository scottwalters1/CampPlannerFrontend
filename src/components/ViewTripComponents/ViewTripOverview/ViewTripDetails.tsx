interface TripDetailsProps {
  tripName: string;
  recName: string;
  tripDescription: string;
  startDate: Date;
  endDate: Date;
}

const ViewTripDetails = ({
  tripName,
  tripDescription,
  recName,
  startDate,
  endDate,
}: TripDetailsProps) => {
  return (
    <div className="d-flex flex-column text-center m-4">
      <h3>
       {recName}
      </h3>
      <div className="inner-container text-start p-3 flex-grow-1" style={{width:400}}>
        <h6>{tripName}: {tripDescription}</h6>
      </div>
      <p className="inner-container mt-2">
        START: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}{" "}
        :END
      </p>
    </div>
  );
};

export default ViewTripDetails;
