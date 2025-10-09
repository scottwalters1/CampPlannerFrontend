import Calendar from "react-calendar";

interface TripDetailsProps {
  tripName: string;
  recName: string;
  tripDescription: string;
  startDate: Date;
  endDate: Date;
  onChange: (date: Date) => void;
  selectedDate: Date | null;
}

const ViewTripDetails = ({
  tripName,
  tripDescription,
  recName,
  startDate,
  endDate,
  onChange,
  selectedDate,
}: TripDetailsProps) => {
  return (
    <div className="d-flex flex-column text-center m-3 details">
      <h3 className="header-container">{tripName}</h3>
      <div className="inner-container text-start p-3 flex-grow-1 mb-3">
        <h6>
          <strong><em>{recName}</em></strong>: {tripDescription}
        </h6>
      </div>
      <h3 className="header-container">Camping Trip Dates</h3>
      <div className="inner-container p-3">
        <Calendar
          minDate={startDate}
          maxDate={endDate}
          activeStartDate={startDate}
          onChange={(d) => onChange(d as Date)}
          value={selectedDate}
        />
      </div>
      <p className="inner-container mt-2">
        START: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}{" "}
        :END
      </p>
    </div>
  );
};

export default ViewTripDetails;
