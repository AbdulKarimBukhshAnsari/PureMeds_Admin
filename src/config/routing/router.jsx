import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../views/Login/Login";
import Dashboard from "../../views/Dashboard/Dashboard";
import AdminLayout from "../../components/ui/AdminPage/AdminLayout";
import PrivateRouter from "./privateRouter";
import AddMedicine from "../../views/AddMedicine/AddMedicine";
import MedicineList from "../../views/MedicineList/MedicineList";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRouter>
            <AdminLayout />
          </PrivateRouter>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="add-medicine" element = {<AddMedicine/>}/>
        <Route path="medicine-list" element = {<MedicineList/>}/>
      </Route>
    </Routes>
  );
}

export default AppRouter;
