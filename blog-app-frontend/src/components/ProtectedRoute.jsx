import { useAuth } from "../store/authStore";
import { Navigate } from "react-router";
import {toast} from "react-hot-toast";

function ProtectedRoute({ children, allowedRoles }) {
  // Select specific state slices to avoid unnecessary re-renders
  const loading = useAuth((state) => state.loading);
  const currentUser = useAuth((state) => state.currentUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  //loading state
  if (loading) {
    return <p>Loading...</p>;
  }
  //if user not loggedin
  if (!isAuthenticated) {
    toast.error("Redirecting to Login")
    //redirect to Login
    return <Navigate to="/login" replace />;
  }

  //check roles
  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
   
    //redirect to Login
    return <Navigate to="/unauthorized" replace state={{ redirectTo: "/" }} />;
  }

  return children;
}

export default ProtectedRoute;