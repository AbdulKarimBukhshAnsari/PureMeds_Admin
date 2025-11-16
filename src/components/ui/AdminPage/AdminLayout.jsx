import { UserButton } from "@clerk/clerk-react";
import {
  LayoutDashboard,
  List,
  PillBottle,
  PlusCircle,
  TriangleAlert,
  ExternalLink,
  ShoppingCart
} from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return ( 
    <div className="flex min-h-screen bg-background">
      <aside className="w-60 bg-primary text-white p-6 flex flex-col justify-between max-h-[100%] flex-shrink-0">
        {/* Top Section */}
        <div>
          <div className="flex flex-row items-center mb-8">
            {/* <PillBottle size={20} className="mr-4" />  */}
            {/* Consult H */}
            <h1 className="text-2xl font-bold ml-3">PureMeds</h1>
          </div>
          <div className="h-px bg-white/20 mb-6"></div>
          <p className="text-md opacity-80 mt-5 p-3">Main Menu</p>
          <nav className="space-y-1">
            <Link to={"/dashboard"}>
              <div className="flex flex-row items-center gap-3 p-3 rounded hover:bg-primary-hover transition">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link to={"/dashboard/add-medicine"}>
              <div className="flex flex-row items-center gap-3 p-3 rounded hover:bg-primary-hover transition">
                <PlusCircle size={20} />
                <span>Add Medicine</span>
              </div>
            </Link>
            <Link to={"/dashboard/medicine-list"}>
            <div className="flex flex-row items-center gap-3 p-3 rounded hover:bg-primary-hover transition">
              <List size={20} />
              <span>Medicine List</span>
            </div>
            </Link>
            <Link to={'/dashboard/alert-list'}>
            <div className="flex flex-row items-center gap-3 p-3 rounded hover:bg-primary-hover transition">
              <TriangleAlert size={20} />
              <span>Alert List</span>
            </div>
            </Link>
            <Link to={'/dashboard/order-list'}>
            <div className="flex flex-row items-center gap-3 p-3 rounded hover:bg-primary-hover transition">
              <ShoppingCart size={20} />
              <span>Order List</span>
            </div>
            </Link>
            <a 
              href="http://localhost:5174/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex flex-row items-center gap-3 p-3 rounded hover:bg-primary-hover transition">
                <ExternalLink size={20} />
                <span>View Website</span>
              </div>
            </a>
          </nav>
        </div>
        {/* Bottom Section (Profile) */}
        <div>
          <div className="h-px bg-white/20 mb-4"></div>
          <div className="flex flex-row items-center gap-3 p-3 rounded hover:bg-primary-hover transition">
            <UserButton
              appearance={{
                theme: "simple",
                variables: {
                  colorPrimary: "#156874",
                  colorBackground: "#f5f3f0",
                  colorWarning: "white",
                },
              }}
            />
            <span>Profile</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 overflow-auto max-h-screen admin-scroll overflow-x-hidden min-w-0">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
