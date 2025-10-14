import { Link } from "react-router";
import "../css/navbar.css";
import { FaBell } from "react-icons/fa";
import { useRef, useState } from "react";
import { InvitePanel } from "./InvitePanel";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const [showInvites, setShowInvites] = useState(false);
  const bellRef = useRef<HTMLButtonElement | null>(null);
  const { user } = useAuth();

  const toggleInvites = () => setShowInvites((prev) => !prev);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">Home</Link>
          <Link to="/trip">Create Trip</Link>
          <Link to="/trips">View Trips</Link>
        </div>

        <div className="navbar-right">
          {user && (
            <div className="relative">
              <button ref={bellRef} onClick={toggleInvites}>
                <FaBell className="m-2" size={18} color="white" />
              </button>
            </div>
          )}

          {user ? (
            <div>
              {/* IMPLEMENT LOGOUT FUNCTIONALITY AND CHANGE TO LINK */}
              <a>Logout</a>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      {showInvites && <InvitePanel anchorRef={bellRef} />}
    </>
  );
}
//TODO: conditional rendering for FaBell based on user logged in.

export default NavBar;
