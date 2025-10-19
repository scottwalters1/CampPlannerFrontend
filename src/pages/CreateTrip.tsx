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
  const [isDiasbled, setIsDisabled] = useState<boolean>(true);

  const updateTripData = (partial: Partial<Trip>) => {
    tripData.current = { ...tripData.current, ...partial };
  };

  const steps = [
    <TripDetails onChange={updateTripData} isDisabled={setIsDisabled} />,
    <TripFacility onChange={updateTripData} isDisabled={setIsDisabled} />,
    <TripCampground
      recAreaId={tripData.current.recAreaId}
      onChange={updateTripData}
      startDate={tripData.current.startDate!}
      endDate={tripData.current.endDate!}
    />,
    <TripActivity
      recAreaId={tripData.current.recAreaId}
      onChange={updateTripData}
      startDate={tripData.current.startDate!}
      endDate={tripData.current.endDate!}
    />,
    <AddTripUsers onChange={updateTripData} />,
  ];

  const nextStep = () => {
    console.log("Current trip data - ", tripData.current);
    setStep((prev) => prev + 1);
  };

  const postTrip = async () => {
    console.log(tripData.current);
    if (!user?.userID) {
      console.error("Cannot post: no logged-in user.");
      return;
    }

    tripData.current.ownerId = user.userID;
    tripData.current.ownerUsername = user.username;

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

  // return (
  //   <div className="main camp-bg">
  //     <div className="rounded-3 p-3 d-flex flex-column h-75 basic-container" style={{minWidth:"500px", maxWidth:"700px"}}>
  //       {steps[step]}
  //       {step === steps.length - 1 ? (
  //         <button className="btn btn-primary" onClick={postTrip}>
  //           Finalize
  //         </button>
  //       ) : (
  //         <button className="btn btn-primary" onClick={nextStep} disabled={isDiasbled}>
  //           Next
  //         </button>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <div
      className="main camp-bg"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="rounded-3 p-3 d-flex flex-column basic-container"
        style={{
          minWidth: "500px",
          maxWidth: "700px",
          maxHeight: "80vh", // limit height
          overflowY: "auto", // make scrollable if content exceeds
        }}
      >
        {steps[step]}
        {step === steps.length - 1 ? (
          <button className="btn btn-primary mt-3" onClick={postTrip}>
            Finalize
          </button>
        ) : (
          <button
            className="btn btn-primary mt-3"
            onClick={nextStep}
            disabled={isDiasbled}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
