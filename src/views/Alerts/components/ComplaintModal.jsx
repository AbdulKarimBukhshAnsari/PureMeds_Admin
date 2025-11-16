import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { X, Calendar, Hash, MapPin, Store, PillBottle, Weight, Building2, User, Save, Loader2 } from "lucide-react";
import BatchAlertWarning from "./BatchAlertWarning";
import { fetchBatchComplaintCount } from "../../../apis/Alerts/alerts";

const ComplaintModal = ({ complaint, isOpen, onClose, onUpdate }) => {
  const { getToken } = useAuth();
  const [status, setStatus] = useState(complaint?.status || "Pending");
  const [adminRemarks, setAdminRemarks] = useState(complaint?.adminRemarks || "");
  const [batchCount, setBatchCount] = useState(0);
  const [loadingBatchCount, setLoadingBatchCount] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (complaint) {
      setStatus(complaint.status);
      setAdminRemarks(complaint.adminRemarks || "");
    }
  }, [complaint]);

  useEffect(() => {
    if (isOpen && complaint?.batchId) {
      fetchBatchCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, complaint?.batchId]);

  const fetchBatchCount = async () => {
    if (!complaint?.batchId) return;
    
    setLoadingBatchCount(true);
    try {
      const token = await getToken();
      const response = await fetchBatchComplaintCount(complaint.batchId, token);
      setBatchCount(response?.data?.count || 0);
    } catch (error) {
      console.error("Error fetching batch count:", error);
      setBatchCount(0);
    } finally {
      setLoadingBatchCount(false);
    }
  };

  const handleSave = async () => {
    if (!complaint) return;

    setSaving(true);
    try {
      await onUpdate(complaint._id, {
        status,
        adminRemarks,
      });
      onClose();
    } catch (error) {
      console.error("Error updating complaint:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !complaint) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (statusValue) => {
    const statusConfig = {
      Pending: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
      Reviewed: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
      Resolved: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
      Invalid: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
    };
    const config = statusConfig[statusValue] || statusConfig.Pending;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} ${config.border} border`}>
        {statusValue}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-primary to-primary-hover text-white px-6 py-4 rounded-t-2xl">
          <h3 className="text-xl font-semibold tracking-wide">
            Complaint Details – {complaint.complaintId || "N/A"}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition p-1 rounded-lg hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body - Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* Batch Alert Warning */}
            {loadingBatchCount ? (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Checking batch complaints...</span>
                </div>
              </div>
            ) : (
              <BatchAlertWarning count={batchCount} />
            )}

            {/* Main Grid Layout - 3 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left Column - Basic Info & Medicine Info */}
              <div className="lg:col-span-2 space-y-4">
                {/* Basic Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-3">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Complaint ID</p>
                      <p className="font-medium text-gray-900">{complaint.complaintId || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">User ID</p>
                      <p className="font-medium text-gray-900 font-mono text-xs break-all">{complaint.userId || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Status</p>
                      <div>{getStatusBadge(status)}</div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Created At</p>
                      <p className="font-medium text-gray-900 text-xs">{formatDate(complaint.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Medicine Information */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-3">Medicine Information</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Medicine Name</p>
                      <p className="font-medium text-gray-900">{complaint.medicineName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Dose</p>
                      <p className="font-medium text-gray-900">{complaint.medicineDose}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Manufacturer</p>
                      <p className="font-medium text-gray-900">{complaint.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Batch ID</p>
                      <p className="font-medium text-gray-900 font-mono text-xs">{complaint.batchId}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Manufacturing Date</p>
                      <p className="font-medium text-gray-900">{complaint.manufacturerDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Expiry Date</p>
                      <p className="font-medium text-gray-900">{complaint.expiryDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Store Name</p>
                      <p className="font-medium text-gray-900">{complaint.store}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">City</p>
                      <p className="font-medium text-gray-900">{complaint.city}</p>
                    </div>
                  </div>
                </div>

                {/* Complaint Description */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-3">Complaint Description</h4>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {complaint.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - QR Code & Admin Actions */}
              <div className="space-y-4">
                {/* QR Code */}
                {complaint.qrCode && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">QR Code</h4>
                    <div className="border border-gray-200 rounded-lg p-3 flex justify-center bg-white">
                      <img
                        src={complaint.qrCode}
                        alt="QR Code"
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Admin Actions */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-3">Admin Actions</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Change Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm bg-white text-gray-900"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Invalid">Invalid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Admin Remarks
                      </label>
                      <textarea
                        value={adminRemarks}
                        onChange={(e) => setAdminRemarks(e.target.value)}
                        placeholder="Add your remarks here..."
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm bg-white text-gray-900 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-white rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover transform transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center gap-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;

