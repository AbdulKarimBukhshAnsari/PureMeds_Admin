import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Login from "../../views/Login/Login";
import Dashboard from "../../views/Dashboard/Dashboard";
import AdminLayout from "../../components/ui/AdminPage/AdminLayout";
import PrivateRouter from "./privateRouter";
import AddMedicine from "../../views/AddMedicine/AddMedicine";
import MedicineList from "../../views/MedicineList/MedicineList";

function AppRouter() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-primary">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={isSignedIn ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRouter>
            <AdminLayout />
          </PrivateRouter>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="add-medicine" element={<AddMedicine />} />
        <Route path="medicine-list" element={<MedicineList />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;