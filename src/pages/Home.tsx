import type { JSX } from "react";
import "../css/home.css";
import { useNavigate } from "react-router-dom";

const Home = (): JSX.Element => {
  const navigate = useNavigate();

  const handleCreateTrip = () => {
    
    // possibly add login verification logic here

    navigate("/trip");
  };

  return (
    <div className="main camp-bg">
      <div style={{ backgroundColor: "#03424d8c", padding: 20, margin: 30 }}>
        <h1>Start your new adventure here</h1>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleCreateTrip}
      >
        Create new trip
      </button>
    </div>
  );
};

export default Home;
