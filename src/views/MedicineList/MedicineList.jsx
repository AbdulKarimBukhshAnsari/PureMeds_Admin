import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import Button from "../../components/ui/Buttons/Button";
import { Link } from "react-router-dom";
import {
  fetchMedicineList,
  deleteMedicine,
} from "../../apis/MedicineList/medicineList";
import { useAuth } from "@clerk/clerk-react";
import ModalConfirmationAlert from "../../components/ui/Alerts/ModalConfirmationAlert";
import ToastNotification from "../../components/ui/Alerts/ToastNotification";
import { useToast } from "../../hooks/useToast/useToast";
import SearchAndFilterBar from "./components/SearchAndFilterBar";
import MedicineTable from "./components/MedicineTable";
import Pagination from "./components/Pagination";
import ViewMedicineModal from "./components/ViewMedicineModal";

const MedicineList = () => {
  const { getToken } = useAuth();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, showSuccess, showError, hideToast] = useToast();
  const [modalData, setModalData] = useState({
    isOpen: false,
    onClose: () => {},
    onConfirm: () => {},
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    isAsync: true,
    confirmVariant: "",
    cancelVariant: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const ITEMS_PER_PAGE = 10;
  const [totalPages, setTotalPages] = useState(1);

  // Reset page to 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const data = await fetchMedicineList(
          token,
          currentPage,
          searchQuery,
          selectedCategory
        );
        setProductList(data?.data?.products || []);
        setTotalPages(
          Math.ceil((data?.data?.totalProducts || 0) / ITEMS_PER_PAGE)
        );
        setTotalProducts(data?.data?.totalProducts || 0);
      } catch (error) {
        console.error("Error fetching medicine list:", error);
      }
    };
    fetchData();
  }, [currentPage, searchQuery, selectedCategory, getToken]);

  const HandleDelete = async (id) => {
    try {
      const token = await getToken();
      await deleteMedicine(id, token);
      setProductList((prevList) =>
        prevList.filter((product) => product._id !== id)
      );
      showSuccess("Medicine deleted successfully.");
      setTotalProducts((prevTotal) => prevTotal - 1);
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to delete medicine");
      console.error("Error deleting medicine:", error);
    }
  };

  const handleDeleteForm = async (id) => {
    setModalData({
      isOpen: true,
      title: "Delete Medicine",
      message: "Are you sure you want to delete this medicine?",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        await HandleDelete(id);
      },
      onClose: () => {
        setModalData((prev) => ({ ...prev, isOpen: false }));
      },
      isAsync: true,
    });
  };

  const handleViewMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r to-gray-900 from-primary bg-clip-text text-transparent inline-block">
              {/* <h1 className="text-4xl font-bold text-orange-400"> */}
              Medicine List
            </h1>
            <p className="text-md text-gray-600 mt-2">
              Manage and monitor your medicine inventory
            </p>
          </div>
          <Link to={"/dashboard/add-medicine"}>
            <Button
              variant="primary"
              className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <PlusCircle size={18} />
              <span>Add New</span>
            </Button>
          </Link>
        </div>

        {/* Search and Filter Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden transform transition-all duration-300 hover:shadow-md">
          <SearchAndFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Table Section */}
          <MedicineTable
            productList={productList}
            onView={handleViewMedicine}
            onDelete={handleDeleteForm}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalProducts={totalProducts}
            productListLength={productList?.length || 0}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* View Medicine Modal */}
        {isModalOpen && selectedMedicine && (
          <ViewMedicineModal
            medicine={selectedMedicine}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedMedicine(null);
            }}
          />
        )}

        <ModalConfirmationAlert {...modalData} />
        <ToastNotification
          isVisible={toast.isVisible}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={hideToast}
        />
      </div>
    </div>
  );
};

export default MedicineList;
