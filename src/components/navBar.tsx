import { Link } from "react-router";
import "../css/navbar.css";
import { FaBell } from "react-icons/fa";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/trip">Create Trip</Link>
        <Link to="/trips">View Trips</Link>
      </div>
      <div className="navbar-right">
        <FaBell className="m-2" size={16} color="white"/>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
//TODO: conditional rendering for FaBell based on user logged in.

export default NavBar;
