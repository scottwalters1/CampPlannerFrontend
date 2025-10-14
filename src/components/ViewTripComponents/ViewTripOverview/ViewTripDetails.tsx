import { DayPicker } from "react-day-picker";

interface TripDetailsProps {
  tripName: string;
  recName: string;
  tripDescription: string;
  startDate: Date;
  endDate: Date;
  onChange: (date: Date) => void;
  selectedDate: Date | undefined;
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
      <div className="inner-container text-start flex-grow-1 mb-3">
        <h6>
          <strong>
            <em>{recName}</em>
          </strong>
          : {tripDescription}
        </h6>
      </div>
      <h3 className="header-container">Camping Trip Dates</h3>
      <div className="inner-container" style={{ alignItems: "center" }}>
        <DayPicker
          mode="single"
          onSelect={(d) => {
            if (d) onChange(d); //dont let users deselect date. causes an error cause ui doesnt know what to render.
          }}
          selected={selectedDate}
          animate
          navLayout="around"
          month={startDate}
          disabled={{ before: startDate, after: endDate }}
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
