import type { JSX } from "react";
import '../css/home.css';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Home = (): JSX.Element => {
  const { user } = useAuth(); 

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="main camp-bg">
      <div style={{ backgroundColor: "#03424d8c", padding: 20, margin: 30 }} className="w-50 rounded-5">
        <h1>Start Your Next Adventure</h1>
        <h6>
          Find the best campgrounds, plan thrilling activities, and enjoy every moment without worrying about logistics.
          All your trip details are in one place, so you can focus on the fun. Adventure has never been this simple.
        </h6>
      </div>
      <div>
        {/* <Link to="/login" className="btn btn-primary m-1">Login</Link>
        <Link to="/register" className="btn btn-primary m-1">Register</Link> */}
        {user ? (
          <>
            <Link to="/trip" className="btn btn-primary m-1">
              Create Trip
            </Link>
            <Link to="/trips" className="btn btn-primary m-1">
              View Trips
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary m-1">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary m-1">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;