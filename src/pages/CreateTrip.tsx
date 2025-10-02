import { useRef, useState, type JSX } from "react";
import { TripDetails } from "../components/TripDetails";
import { TripFacility } from "../components/TripFacility";
import { AddTripUsers } from "../components/AddTripUsers";
import { TripActivity } from "../components/TripActivity";
import type { Trip } from "../models/trip";

export const CreateTrip = (): JSX.Element => {
  const [step, setStep] = useState(0);

  const tripData = useRef<Trip>({} as Trip);

  const updateTripData = (partial: Partial<Trip>) => {
    tripData.current = { ...tripData.current, ...partial };
  };

  const steps = [
    <TripDetails onChange={updateTripData} />,
    <TripFacility />,
    <TripActivity />,
    <AddTripUsers />,
  ];

  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <div className="main camp-bg">
      <div className="rounded-3 p-3 d-flex flex-column h-50 w-25 basic-container">
        {steps[step]}
        {step === steps.length - 1 ? (
          <button className="btn btn-primary">Finalize</button>
        ) : (
          <button className="btn btn-primary" onClick={nextStep}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
