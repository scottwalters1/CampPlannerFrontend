import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface ProtectedRoutesProps{
    children: JSX.Element;
}

const ProtectedRoute = ({children}:ProtectedRoutesProps) => {
    if(!useAuth().user){
        return <Navigate to="/login" replace/>
    }
  return children
}

export default ProtectedRoute