import { LoginPage } from "./pages/Login.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navBar.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { RegisterPage } from "./pages/Register.tsx";
import { CreateTrip } from "./pages/CreateTrip.tsx";
import { ViewTrip } from "./pages/ViewTrips.tsx";
import "./css/common.css";
import ProtectedRoute from "./ProtectedRoute.tsx";

function App() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/trip"
            element={
              <ProtectedRoute>
                <CreateTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <ViewTrip />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
