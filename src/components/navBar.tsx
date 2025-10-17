import { Link } from "react-router";
import "../css/navbar.css";
import { FaBell } from "react-icons/fa";
import { useRef, useState } from "react";
import { InvitePanel } from "./InvitePanel";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const [showInvites, setShowInvites] = useState(false);
  const bellRef = useRef<HTMLButtonElement | null>(null);
  const { user, logout } = useAuth();

  const toggleInvites = () => setShowInvites((prev) => !prev);

  const closeInvites = () => setShowInvites(false);

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
              <span
                ref={bellRef}
                onClick={toggleInvites}
                className="m-2 cursor-pointer inline-flex items-center justify-center"
              >
                <FaBell size={18} color="white" />
              </span>
            </div>
          )}

          {user ? (
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      {showInvites && (
        <InvitePanel anchorRef={bellRef} onClose={closeInvites} />
      )}
    </>
  );
}

export default NavBar;
