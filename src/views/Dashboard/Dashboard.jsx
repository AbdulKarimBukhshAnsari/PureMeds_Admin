import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Bell,
} from "lucide-react";
import TabNavigation from "./components/TabNavigation";
import OverviewTab from "./Tabs/Overview/OverviewTab";
import MedicinesTab from "./Tabs/Medicines/MedicinesTab";
import OrdersTab from "./Tabs/Orders/OrdersTab";
import ComplaintsTab from "./Tabs/Complaints/ComplaintsTab";
import AlertsTab from "./Tabs/Alerts/AlertsTab";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "medicines", label: "Medicines", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "complaints", label: "Complaints", icon: FileText },
  { id: "alerts", label: "Alerts", icon: Bell },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "medicines":
        return <MedicinesTab />;
      case "orders":
        return <OrdersTab />;
      case "complaints":
        return <ComplaintsTab />;
      case "alerts":
        return <AlertsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-5 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent inline-block mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome back! Here's what's happening with your inventory today.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Dashboard;
