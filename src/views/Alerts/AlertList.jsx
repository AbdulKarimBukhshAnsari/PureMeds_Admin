import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  fetchAllComplaints,
  updateComplaintStatus,
} from "../../apis/Alerts/alerts";
import FilterPanelHorizontal from "./components/FilterPanelHorizontal";
import ComplaintTable from "./components/ComplaintTable";
import ComplaintModal from "./components/ComplaintModal";
import ToastNotification from "../../components/ui/Alerts/ToastNotification";

export function AlertList() {
  const { getToken } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    city: "",
    store: "",
    batchId: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [toast, setToast] = useState({
    isVisible: false,
    type: "success",
    message: "",
  });

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetchAllComplaints(token, {
        ...filters,
        page: currentPage,
        limit: 15,
      });

      if (response?.data) {
        setComplaints(response.data.complaints || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch complaints";
      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch complaints when filters or page changes
  useEffect(() => {
    fetchComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Debounce filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when filters change
      fetchComplaints();
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.city, filters.store, filters.batchId]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      city: "",
      store: "",
      batchId: "",
    });
  };

  const handleRowClick = (complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  const handleUpdateComplaint = async (id, data) => {
    try {
      const token = await getToken();
      await updateComplaintStatus(id, data, token);
      
      // Update local state
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint._id === id
            ? { ...complaint, status: data.status, adminRemarks: data.adminRemarks }
            : complaint
        )
      );

      showToast("success", "Complaint updated successfully!");
      fetchComplaints(); // Refresh the list
    } catch (error) {
      console.error("Error updating complaint:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update complaint";
      showToast("error", errorMessage);
      throw error; // Re-throw to let modal handle it
    }
  };

  const showToast = (type, message) => {
    setToast({
      isVisible: true,
      type,
      message,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
              Alert Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Monitor and manage medication complaints
            </p>
          </div>
        </div>

        {/* Filters - Above Table */}
        <FilterPanelHorizontal
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Complaint Table */}
        <ComplaintTable
          complaints={complaints}
          loading={loading}
          onRowClick={handleRowClick}
        />

        {/* Pagination */}
        {!loading && complaints.length > 0 && totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Complaint Modal */}
        {isModalOpen && selectedComplaint && (
          <ComplaintModal
            complaint={selectedComplaint}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedComplaint(null);
            }}
            onUpdate={handleUpdateComplaint}
          />
        )}

        {/* Toast Notification */}
        <ToastNotification
          isVisible={toast.isVisible}
          type={toast.type}
          message={toast.message}
          onClose={hideToast}
        />
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
