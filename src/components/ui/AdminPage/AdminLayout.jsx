import { UserButton } from "@clerk/clerk-react";
import {
  LayoutDashboard,
  List,
  PlusCircle,
  TriangleAlert,
  ExternalLink,
  ShoppingCart,
} from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const [manualOpen, setManualOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  const open = manualOpen || hovered;

  const menuItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/dashboard/add-medicine", icon: PlusCircle, label: "Add Medicine" },
    { to: "/dashboard/medicine-list", icon: List, label: "Medicine List" },
    { to: "/dashboard/alert-list", icon: TriangleAlert, label: "Alert List" },
    { to: "/dashboard/order-list", icon: ShoppingCart, label: "Order List" },
  ];

  return (
    <div className="flex min-h-screen bg-background relative">
      {/* Sidebar */}
      <aside
        className={`flex flex-col justify-between bg-[#deefec]
    text-orange-400 transition-all duration-300 overflow-hidden border-r border-gray-200`}
        style={{ width: open ? "15rem" : "5rem", padding: "1.5rem" }}
      >
        {/* Top Section */}
        <div className="flex flex-col">
          {/* Toggle + Heading */}
          <div className="flex items-center h-16 gap-3">
            <button
              onClick={() => setManualOpen(!manualOpen)}
              className="cursor-pointer p-1 flex-shrink-0"
            >
              <svg
                className="w-6 h-6 text-brand-primary"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2L12 12M12 12L2 7L12 2L22 7L12 12Z"
                  stroke="orange"
                  strokeWidth="2"
                />
                <path
                  d="M2 17L12 22L22 17M12 12V22"
                  stroke="orange"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <span
              className="text-2xl font-semibold text-primary overflow-hidden transition-all duration-300 whitespace-nowrap"
              style={{ maxWidth: open ? "calc(100% - 3rem)" : "0px" }}
            >
              PureMeds
            </span>
          </div>
          <div className="h-px bg-white/20" />
        </div>

        {/* Middle Menu (centered) */}
        <div
          className="flex flex-col justify-center gap-1"
          onMouseEnter={() => {
            if (!manualOpen) setHovered(true);
          }}
          onMouseLeave={() => {
            if (!manualOpen) setHovered(false);
          }}
        >
          {menuItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to}>
                <div
                  className={`flex items-center h-12 p-1 rounded-lg transition-all duration-300
            ${active ? "text-primary" : "hover:text-primary"}`}
                >
                  <div className="flex-shrink-0 w-6 h-6 flex justify-center items-center">
                    <item.icon size={20} />
                  </div>
                  <div
                    className="flex-grow ml-3 overflow-hidden transition-all duration-300 whitespace-nowrap"
                    style={{ maxWidth: open ? "100%" : "0px" }}
                  >
                    <span>{item.label}</span>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* External Link */}
          <a
            href="http://localhost:5173/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center h-12 p-1 rounded-lg hover:bg-white/10 transition-all duration-300 hover:text-primary">
              <div className="flex-shrink-0 w-6 h-6 flex justify-center items-center ">
                <ExternalLink size={20} />
              </div>
              <div
                className="flex-grow ml-3 overflow-hidden transition-all duration-300 whitespace-nowrap"
                style={{ maxWidth: open ? "100%" : "0px" }}
              >
                <span>View Website</span>
              </div>
            </div>
          </a>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col p-1">
          <div className="h-px bg-white/20" />
          <div
            className="flex items-center h-14 rounded-lg transition-all duration-300 mt-2"
            onMouseEnter={() => {
              if (!manualOpen) setHovered(true);
            }}
            onMouseLeave={() => {
              if (!manualOpen) setHovered(false);
            }}
          >
            <div className="flex-shrink-0 w-6 h-6 flex justify-center items-center">
              <UserButton
                appearance={{
                  theme: "simple",
                  variables: {
                    colorPrimary: "#156874",
                    colorBackground: "#f5f3f0",
                  },
                }}
              />
            </div>
            <div
              className="ml-3 overflow-hidden transition-all duration-300 whitespace-nowrap"
              style={{ maxWidth: open ? "100%" : "0px" }}
            >
              <span>Profile</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-2 overflow-auto max-h-screen admin-scroll overflow-x-hidden min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
