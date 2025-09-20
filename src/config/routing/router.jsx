import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../views/Login/Login";
import Dashboard from "../../views/Dashboard/Dashboard";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Layout from "../../Layout";
import AdminLayout from "../../components/AdminPage/AdminLayout";
import PrivateRouter from "./privateRouter";

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
      </Route>
    </Routes>
  );
}

export default AppRouter;
