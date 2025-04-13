import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { LandingPage } from "./LandingPage";

export const Home = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return <LandingPage />;
};
