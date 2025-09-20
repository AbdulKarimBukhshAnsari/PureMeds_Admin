import { useAuth } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRouter({ children }) {
  const { isLoaded, isSignedIn } = useAuth(); // provided by clerk

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-primary">
        Loading...
      </div>
    );
  }
  return isSignedIn ? children : <Navigate to={"/"} replace />;
}

export default PrivateRouter;
