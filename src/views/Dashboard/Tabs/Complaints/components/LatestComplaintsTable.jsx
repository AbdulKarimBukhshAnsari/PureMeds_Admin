import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const LatestComplaintsTable = ({ complaints }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: "bg-yellow-100 text-yellow-800",
      Reviewed: "bg-blue-100 text-blue-800",
      Resolved: "bg-green-100 text-green-800",
      Invalid: "bg-red-100 text-red-800",
    };
    return statusConfig[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <FileText className="text-primary" size={20} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Latest Complaints</h2>
      </div>
      <div className="space-y-3">
        {complaints.length > 0 ? (
          complaints.map((complaint, index) => (
            <motion.div
              key={complaint._id || index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">
                  {complaint.complaintId || "N/A"}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{complaint.medicineName}</p>
              <p className="text-xs text-gray-500">Batch: {complaint.batchId} • {formatDate(complaint.createdAt)}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No complaints found</p>
        )}
      </div>
      {complaints.length > 0 && (
        <Link to="/dashboard/alert-list">
          <button className="w-full mt-4 px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition">
            View All Complaints
          </button>
        </Link>
      )}
    </div>
  );
};

export default LatestComplaintsTable;

