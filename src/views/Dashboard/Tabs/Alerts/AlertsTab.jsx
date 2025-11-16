import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Package, Calendar, FileText, ShoppingCart, RefreshCw } from "lucide-react";
import { useAlertsDashboard } from "../../hooks/useDashboardData";
import LoadingScreen from "../../components/LoadingScreen";
import AlertCard from "./components/AlertCard";

const AlertsTab = () => {
  const { data, loading, error } = useAlertsDashboard();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading alerts dashboard data</p>
      </div>
    );
  }

  const alertSections = [
    {
      title: "Low Stock Alerts",
      icon: Package,
      color: "orange",
      alerts: data.lowStockAlerts || [],
      emptyMessage: "No low stock alerts",
    },
    {
      title: "Expiry Alerts",
      icon: Calendar,
      color: "red",
      alerts: data.expiryAlerts || [],
      emptyMessage: "No expiry alerts",
    },
    {
      title: "Complaint Alerts",
      icon: FileText,
      color: "purple",
      alerts: data.complaintAlerts || [],
      emptyMessage: "No complaint alerts",
    },
    {
      title: "Order Issues",
      icon: ShoppingCart,
      color: "blue",
      alerts: data.orderIssues || [],
      emptyMessage: "No order issues",
    },
    {
      title: "Stock Refill Reminders",
      icon: RefreshCw,
      color: "yellow",
      alerts: data.stockRefillReminders || [],
      emptyMessage: "No stock refill reminders",
    },
  ];

  return (
    <div className="space-y-6">
      {alertSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.1, duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 ${
              section.color === "orange" ? "bg-orange-100" :
              section.color === "red" ? "bg-red-100" :
              section.color === "purple" ? "bg-purple-100" :
              section.color === "blue" ? "bg-blue-100" :
              section.color === "yellow" ? "bg-yellow-100" : "bg-gray-100"
            } rounded-lg`}>
              <section.icon size={20} className={
                section.color === "orange" ? "text-orange-600" :
                section.color === "red" ? "text-red-600" :
                section.color === "purple" ? "text-purple-600" :
                section.color === "blue" ? "text-blue-600" :
                section.color === "yellow" ? "text-yellow-600" : "text-gray-600"
              } />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
            <span className={`ml-auto px-3 py-1 ${
              section.color === "orange" ? "bg-orange-100 text-orange-800" :
              section.color === "red" ? "bg-red-100 text-red-800" :
              section.color === "purple" ? "bg-purple-100 text-purple-800" :
              section.color === "blue" ? "bg-blue-100 text-blue-800" :
              section.color === "yellow" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
            } text-xs font-semibold rounded-full`}>
              {section.alerts.length}
            </span>
          </div>
          <div className="space-y-3">
            {section.alerts.length > 0 ? (
              section.alerts.map((alert, index) => (
                <AlertCard
                  key={index}
                  alert={alert}
                  type={section.title}
                  color={section.color}
                  delay={index * 0.05}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">{section.emptyMessage}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AlertsTab;

