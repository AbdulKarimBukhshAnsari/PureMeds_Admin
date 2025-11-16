import React, { useState, useEffect , useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  fetchAllOrders,
  updateOrderStatus,
  exportOrdersCSV,
} from "../../apis/Orders/orders";
import FilterPanelHorizontal from "./components/FilterPanelHorizontal";
import OrderTable from "./components/OrderTable";
import OrderModal from "./components/OrderModal";
import Pagination from "./components/Pagination";
import ToastNotification from "../../components/ui/Alerts/ToastNotification";
import { Download } from "lucide-react";

export function OrderList() {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const isFirstRun = useRef(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    batchId: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const ITEMS_PER_PAGE = 10;
  const [toast, setToast] = useState({
    isVisible: false,
    type: "success",
    message: "",
  });
  const [exportingCSV, setExportingCSV] = useState(false);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetchAllOrders(token, {
        ...filters,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      });

      if (response?.data) {
        setOrders(response.data.orders || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalOrders(response.data.totalOrders || 0);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch orders";
      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Debounce filter changes
  useEffect(() => {
    if(isFirstRun.current) return ; 
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when filters change
      fetchOrders();
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.batchId]);

  useEffect(() => {
    fetchOrders();
    isFirstRun.current = false ; 
  }, [currentPage])
  

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      batchId: "",
    });
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateOrder = async (id, data) => {
    try {
      const token = await getToken();
      await updateOrderStatus(id, data, token);

      // Update local state
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, status: data.status, adminRemarks: data.adminRemarks }
            : order
        )
      );

      showToast("success", "Order updated successfully!");
      fetchOrders(); // Refresh the list
    } catch (error) {
      console.error("Error updating order:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update order";
      showToast("error", errorMessage);
      throw error; // Re-throw to let modal handle it
    }
  };

  const handleExportCSV = async () => {
    try {
      setExportingCSV(true);
      const token = await getToken();
      await exportOrdersCSV(filters, token);
      showToast("success", "Orders exported successfully!");
    } catch (error) {
      console.error("Error exporting orders:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to export orders";
      showToast("error", errorMessage);
    } finally {
      setExportingCSV(false);
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
              Order Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Monitor and manage customer orders
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            disabled={exportingCSV}
            className="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover transform transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center gap-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* Order Table */}
        <OrderTable
          orders={orders}
          loading={loading}
          onRowClick={handleRowClick}
        />

        {/* Pagination */}
        {!loading && orders.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalOrders={totalOrders}
            orderListLength={orders.length}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Order Modal */}
        {isModalOpen && selectedOrder && (
          <OrderModal
            order={selectedOrder}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedOrder(null);
            }}
            onUpdate={handleUpdateOrder}
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

