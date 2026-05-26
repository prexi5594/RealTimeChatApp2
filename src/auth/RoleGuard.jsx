import { Navigate } from "react-router-dom";

const RoleGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // No user logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is not admin
  if (user.role !== "admin") {
    return <Navigate to="/chat" replace />;
  }

  // Allow admin access
  return children;
};

export default RoleGuard;