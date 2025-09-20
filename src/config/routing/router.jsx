import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../views/Login/Login";
import Dashboard from "../../views/Dashboard/Dashboard";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Layout from "../../Layout";
import AdminLayout from "../../components/AdminPage/AdminLayout";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element = {<SignedOut><Layout/></SignedOut>}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/dashboard" element={<SignedIn><AdminLayout/></SignedIn>}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
