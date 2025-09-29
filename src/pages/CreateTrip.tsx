import {useState, type JSX } from "react";
import { TripDetails } from "../components/TripDetails";
import { TripFacility } from "../components/TripFacility";
import { AddTripUsers } from "../components/AddTripUsers";

export const Trip = (): JSX.Element => {
  const [tripData, setTripData] = useState();
  const [step, setStep] = useState(0);

  function nextStep(){
    setStep(step +1);
  }

  return (
    <div>
        {step === 0 && (<TripDetails onNext={() => nextStep()}/>)}
        {step === 1 && (<TripFacility onNext= {() => nextStep()} />)}
        {step === 2 && (<AddTripUsers onNext={()=> nextStep()} />)}
    </div>
  );
};
