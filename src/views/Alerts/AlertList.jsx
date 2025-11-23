import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  fetchAllComplaints,
  updateComplaintStatus,
  exportComplaintsCSV,
} from "../../apis/Alerts/alerts";
import FilterPanelHorizontal from "./components/FilterPanelHorizontal";
import ComplaintTable from "./components/ComplaintTable";
import ComplaintModal from "./components/ComplaintModal";
import Pagination from "./components/Pagination";
import ToastNotification from "../../components/ui/Alerts/ToastNotification";
import { Download } from "lucide-react";

export function AlertList() {
  const { getToken } = useAuth();
  const isFirstRun = useRef(true);
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
  const [totalComplaints, setTotalComplaints] = useState(0);
  const ITEMS_PER_PAGE = 10;
  const [toast, setToast] = useState({
    isVisible: false,
    type: "success",
    message: "",
  });
  const [exportingCSV, setExportingCSV] = useState(false);

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetchAllComplaints(token, {
        ...filters,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      });

      if (response?.data) {
        setComplaints(response.data.complaints || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalComplaints(response.data.totalComplaints || 0);
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

  // Debounce filter changes
  useEffect(() => {
    if (isFirstRun.current) return;
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      fetchComplaints();
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.city, filters.store, filters.batchId]);

  useEffect(() => {
    fetchComplaints();
    isFirstRun.current = false;
  }, [currentPage]);

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
            ? {
                ...complaint,
                status: data.status,
                adminRemarks: data.adminRemarks,
              }
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

  const handleExportCSV = async () => {
    try {
      setExportingCSV(true);
      const token = await getToken();
      await exportComplaintsCSV(filters, token);
      showToast("success", "Complaints exported successfully!");
    } catch (error) {
      console.error("Error exporting complaints:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to export complaints";
      showToast("error", errorMessage);
    } finally {
      setExportingCSV(false);
    }
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
          <button
            onClick={handleExportCSV}
            disabled={exportingCSV}
            className="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover transform transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center gap-2 font-medium text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={18} />
            {exportingCSV ? "Exporting..." : "Export CSV"}
          </button>
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
        {!loading && complaints.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalComplaints={totalComplaints}
            complaintListLength={complaints.length}
            onPageChange={setCurrentPage}
          />
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
