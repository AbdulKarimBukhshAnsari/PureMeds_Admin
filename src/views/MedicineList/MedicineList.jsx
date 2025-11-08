import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Search,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";
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
import EditMedicineModal from "./ui/EditMedicineModal";

const MedicineList = () => {
  const { getToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [medicine, setMedicine] = useState(null);
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
  const [totalPages, setTotalPages] = useState(
    Math.ceil(productList?.length / ITEMS_PER_PAGE)
  );

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
        setProductList(data?.data?.products);
        setTotalPages(Math.ceil(data?.data?.totalProducts / ITEMS_PER_PAGE));
        setTotalProducts(data?.data?.totalProducts);
      } catch (error) {
        console.error("Error fetching medicine list:", error);
      }
    };
    fetchData();
  }, [searchQuery, selectedCategory, currentPage]);

  const HandleDelete = async (id) => {
    try {
      const token = await getToken();
      await deleteMedicine(id, token);
      setProductList((prevList) =>
        prevList.filter((product) => product._id !== id)
      );
      showSuccess("Medicine deleted successfully.");
    } catch (error) {
      showError("Failed to delete medicine.");
      console.error("Error deleting medicine:", error);
    }
  };

  const handleDeleteForm = async (id) => {
    try {
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
      setTotalProducts((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
        >
          <div className="mb-4 lg:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent inline-block">
              Medicine List
            </h1>
            <p className="text-gray-600 mt-2">
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
        </motion.div>

        {/* Search and Filter Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden transform transition-all duration-300 hover:shadow-md"
        >
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search medicines..."
                  className="pl-12 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="w-full sm:w-auto">
                <select
                  className="w-full sm:w-auto px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50/50 cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All Categories</option>
                  <option value="pain-fever">Pain & Fever</option>
                  <option value="infections">Infections</option>
                  <option value="heart-bp">Heart & BP</option>
                  <option value="lungs-allergy">Lungs & Allergy</option>
                  <option value="stomach-digestion">Stomach & Digestion</option>
                  <option value="hormones-diabetes">Hormones & Diabetes</option>
                  <option value="brain-mental">Brain & Mental</option>
                  <option value="vitamins-others">Vitamins & Others</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="relative overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-y border-gray-200">
                  <tr>
                    <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-14"></div>
                        <span>Medicine</span>
                      </div>
                    </th>
                    <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                      Price
                    </th>
                    <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                      Stock
                    </th>
                    <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {productList?.length > 0 ? (
                    productList?.map((product, index) => (
                      <motion.tr
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-blue-50/30 transition-all duration-200 group"
                      >
                        <td className="py-5 px-6 text-left">
                          <div className="flex items-center gap-4">
                            <div className="transform transition-transform duration-200 group-hover:scale-110">
                              <img
                                src={product.productImage}
                                alt={product.productName}
                                className="w-14 h-14 object-cover rounded-xl shadow-md border border-gray-200"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 text-md">
                                {product.productName}
                              </h3>
                              {product.chemicalName && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {product.chemicalName}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-left">
                          <span className="text-md font-medium text-gray-900">
                            Rs. {product.price}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-left">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                            {product.availableStock}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-left">
                          <div className="flex items-center gap-3">
                            <button
                              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Edit"
                              onClick={() => {
                                setMedicine(product);
                                setOpen(true);
                              }}
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                              onClick={() => handleDeleteForm(product._id)}
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <Package size={32} className="text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-lg mb-2">
                          No medicines found
                        </p>
                        <p className="text-gray-400">
                          Try adjusting your search or filter terms
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <EditMedicineModal
            medicine={medicine}
            isOpen={open}
            onClose={() => setOpen(false)}
            onSave={(updatedData) => {
              console.log(updatedData);
              setOpen(false);
            }}
          />

          {/* Pagination */}
          {productList?.length > 0 && (
            <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-gray-50/50">
              <div className="text-gray-600 text-sm mb-4 sm:mb-0">
                Showing {productList?.length} of {totalProducts} medicines
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                  <ChevronLeft
                    size={20}
                    className={
                      currentPage === 1 ? "text-gray-400" : "text-primary"
                    }
                  />
                </button>
                {totalPages > 0 &&
                  [...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-2 min-w-[40px] border rounded-xl transition-all duration-200 ${
                        currentPage === idx + 1
                          ? "bg-primary text-white border-primary shadow-md"
                          : "border-gray-300 hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                <button
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                >
                  <ChevronRight
                    size={20}
                    className={
                      currentPage === totalPages
                        ? "text-gray-400"
                        : "text-primary"
                    }
                  />
                </button>
              </div>
            </div>
          )}
        </motion.div>

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
