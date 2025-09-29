import { Link } from "react-router";
import '../css/navbar.css'

function NavBar() {
  return (
    <nav className="navbar">
        <div className="navbar-left">
            <Link to="/">Home</Link>
            <Link to="/trip">Create Trip</Link>
            <Link to="/trips">View Trips</Link>
        </div>
      <div className="navbar-right">
        <Link to="/login">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
