import { useRef, useState, type JSX } from "react";
import { TripDetails } from "../components/CreateTripComponents/TripDetails";
import { TripFacility } from "../components/CreateTripComponents/TripFacility";
import { AddTripUsers } from "../components/CreateTripComponents/AddTripUsers";
import { TripActivity } from "../components/CreateTripComponents/TripActivity";
import type { Trip } from "../models/trip";
import { apiFetch } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { TripCampground } from "../components/CreateTripComponents/CampGround";
import { useNavigate } from "react-router-dom";

export const CreateTrip = (): JSX.Element => {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const tripData = useRef<Trip>({} as Trip);

  const updateTripData = (partial: Partial<Trip>) => {
    tripData.current = { ...tripData.current, ...partial };
  };

  const steps = [
    <TripDetails onChange={updateTripData} />,
    <TripFacility onChange={updateTripData} />,
    <TripCampground
      recAreaId={tripData.current.recAreaId}
      onChange={updateTripData}
      startDate={tripData.current.startDate}
      endDate={tripData.current.endDate}
    />,
    <TripActivity
      recAreaId={tripData.current.recAreaId}
      onChange={updateTripData}
      startDate={tripData.current.startDate}
      endDate={tripData.current.endDate}
    />,
    <AddTripUsers onChange={updateTripData} />,
  ];

  const nextStep = () => {
    console.log("Current trip data:", tripData.current);
    setStep((prev) => prev + 1);
  };

  const postTrip = async () => {
    console.log(tripData.current);
    if (!user?.userID) {
      console.error("Cannot post: no logged-in user.");
      return;
    }

    tripData.current.ownerId = user.userID;

    try {
      const response = await apiFetch("/trips", {
        method: "POST",
        body: tripData.current,
      });

      navigate("/trips");
      console.log("Trip created successfully:", response);
    } catch (err: any) {
      console.error("Failed to create trip:", err);
    }
  };

  return (
    <div className="main camp-bg">
      <div className="rounded-3 p-3 d-flex flex-column h-75 w-25 basic-container">
        {steps[step]}
        {step === steps.length - 1 ? (
          <button className="btn btn-primary" onClick={postTrip}>
            Finalize
          </button>
        ) : (
          <button className="btn btn-primary" onClick={nextStep}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
