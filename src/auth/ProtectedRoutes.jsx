import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // User not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Allow access
  return children;
};

export default ProtectedRoute;