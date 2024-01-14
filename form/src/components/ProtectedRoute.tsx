import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
