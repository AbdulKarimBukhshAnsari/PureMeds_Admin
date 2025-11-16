import React from "react";
import { ExternalLink, Loader2 } from "lucide-react";

const ComplaintTable = ({ complaints, loading, onRowClick }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
      },
      Reviewed: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
      },
      Resolved: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
      },
      Invalid: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
      },
    };

    const config = statusConfig[status] || statusConfig.Pending;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} ${config.border} border`}
      >
        {status}
      </span>
    );
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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
        <div className="flex flex-col items-center justify-center">
          <Loader2 size={32} className="animate-spin text-primary mb-4" />
          <p className="text-gray-600">Loading complaints...</p>
        </div>
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <ExternalLink size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg mb-2">No complaints found</p>
          <p className="text-gray-400">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-y border-gray-200">
            <tr>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Complaint ID
              </th>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Medicine Name
              </th>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Batch ID
              </th>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Store
              </th>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Status
              </th>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Date Created
              </th>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {complaints.map((complaint, index) => (
              <tr
                key={complaint._id}
                onClick={() => onRowClick(complaint)}
                className="hover:bg-blue-50/30 transition-all duration-200 group cursor-pointer"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animation: "slideInUp 0.3s ease-out forwards",
                }}
              >
                <td className="py-5 px-6">
                  <span className="text-md font-medium text-gray-900">
                    {complaint.complaintId || "N/A"}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <div className="font-medium text-gray-900">
                    {complaint.medicineName}
                  </div>
                </td>
                <td className="py-5 px-6">
                  <span className="text-gray-700 font-mono text-sm">
                    {complaint.batchId}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <span className="text-gray-700">{complaint.store}</span>
                </td>
                <td className="py-5 px-6">{getStatusBadge(complaint.status)}</td>
                <td className="py-5 px-6">
                  <span className="text-gray-600 text-sm">
                    {formatDate(complaint.createdAt)}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick(complaint);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover transform transition-all duration-200 hover:scale-105 hover:shadow-md group/btn"
                  >
                    View
                    <ExternalLink
                      size={14}
                      className="group-hover/btn:translate-x-0.5 transition-transform"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintTable;

