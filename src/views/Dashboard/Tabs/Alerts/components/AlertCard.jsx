import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const AlertCard = ({ alert, type, color, delay }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getAlertContent = () => {
    switch (type) {
      case "Low Stock Alerts":
        return (
          <>
            <p className="font-semibold text-gray-900">{alert.productName}</p>
            <p className="text-sm text-gray-600">Only {alert.availableStock} units remaining</p>
            <p className="text-xs text-gray-500 mt-1">Batch: {alert.batchId}</p>
          </>
        );
      case "Expiry Alerts":
        return (
          <>
            <p className="font-semibold text-gray-900">{alert.productName}</p>
            <p className="text-sm text-gray-600">Expires: {formatDate(alert.expiryDate)}</p>
            <p className="text-xs text-gray-500 mt-1">Batch: {alert.batchId}</p>
          </>
        );
      case "Complaint Alerts":
        return (
          <>
            <p className="font-semibold text-gray-900">{alert.complaintId || "N/A"}</p>
            <p className="text-sm text-gray-600">{alert.medicineName}</p>
            <p className="text-xs text-gray-500 mt-1">Batch: {alert.batchId} • {formatDate(alert.createdAt)}</p>
          </>
        );
      case "Order Issues":
        return (
          <>
            <p className="font-semibold text-gray-900">{alert.orderId || "N/A"}</p>
            <p className="text-sm text-gray-600">Cancelled • Rs. {alert.totalAmount || 0}</p>
            <p className="text-xs text-gray-500 mt-1">{formatDate(alert.createdAt)}</p>
          </>
        );
      case "Stock Refill Reminders":
        return (
          <>
            <p className="font-semibold text-gray-900">{alert.productName}</p>
            <p className="text-sm text-red-600 font-medium">Critical: Only {alert.availableStock} units</p>
            <p className="text-xs text-gray-500 mt-1">Batch: {alert.batchId}</p>
          </>
        );
      default:
        return <p className="text-gray-900">{JSON.stringify(alert)}</p>;
    }
  };

  const colorClasses = {
    orange: "bg-orange-50 border-orange-200 hover:bg-orange-100 bg-orange-500",
    red: "bg-red-50 border-red-200 hover:bg-red-100 bg-red-500",
    purple: "bg-purple-50 border-purple-200 hover:bg-purple-100 bg-purple-500",
    blue: "bg-blue-50 border-blue-200 hover:bg-blue-100 bg-blue-500",
    yellow: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100 bg-yellow-500",
  };

  const bgClass = colorClasses[color]?.split(" ")[0] || "bg-gray-50";
  const borderClass = colorClasses[color]?.split(" ")[1] || "border-gray-200";
  const hoverClass = colorClasses[color]?.split(" ")[2] || "hover:bg-gray-100";
  const iconBgClass = colorClasses[color]?.split(" ")[3] || "bg-gray-500";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.2 }}
      className={`p-4 ${bgClass} rounded-xl border ${borderClass} ${hoverClass} transition-colors flex items-start gap-3`}
    >
      <div className={`p-2 ${iconBgClass} rounded-lg flex-shrink-0`}>
        <AlertTriangle size={16} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        {getAlertContent()}
      </div>
    </motion.div>
  );
};

export default AlertCard;

