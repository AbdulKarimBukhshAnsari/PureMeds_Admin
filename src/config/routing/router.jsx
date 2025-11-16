import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Login from "../../views/Login/Login";
import Dashboard from "../../views/Dashboard/Dashboard";
import AdminLayout from "../../components/ui/AdminPage/AdminLayout";
import PrivateRouter from "./privateRouter";
import AddMedicine from "../../views/AddMedicine/AddMedicine";
import MedicineList from "../../views/MedicineList/MedicineList";
import Loader from "../../components/ui/LoadingAnimation/Loader";
import { AlertList } from "../../views/Alerts/AlertList";
import { OrderList } from "../../views/Orders/OrderList";

function AppRouter() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="bg-background min-h-screen flex flex-col justify-center items-center text-center">
        <Loader/>
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
        <Route path="alert-list" element={<AlertList />} />
        <Route path="order-list" element={<OrderList />} />

      </Route>
    </Routes>
  );
}

export default AppRouter;