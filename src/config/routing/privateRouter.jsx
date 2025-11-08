import { useAuth } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "../../components/ui/LoadingAnimation/Loader";

function PrivateRouter({ children }) {
  const { isLoaded, isSignedIn } = useAuth(); // provided by clerk

  if (!isLoaded) {
    return (
      <div className="bg-background min-h-screen flex flex-col justify-center items-center text-center">
        <Loader/>
      </div>
    );
  }
  return isSignedIn ? children : <Navigate to={"/"} replace />;
}

export default PrivateRouter;
