import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Search,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Button from "../../components/ui/Buttons/Button";
import { products } from "../../utils/mockData";
import { Link } from "react-router-dom";
import {
  fetchMedicineList,
  deleteMedicine,
} from "../../apis/MedicineList/medicineList";
import { useAuth } from "@clerk/clerk-react";

const MedicineList = () => {
  const { getToken } = useAuth();
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
        const data = await fetchMedicineList(token, currentPage, searchQuery, selectedCategory);
        setProductList(data?.data?.products);
        setTotalPages(Math.ceil(data?.data?.totalProducts / ITEMS_PER_PAGE));
        setTotalProducts(data?.data?.totalProducts);
        console.log("Fetched medicine list:", data?.data);
      } catch (error) {
        console.error("Error fetching medicine list:", error);
      }
    };
    fetchData();
  }, [searchQuery, selectedCategory, currentPage ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      setProductList(productList.filter((product) => product.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Medicine List</h1>
        <Link to={"/dashboard/add-medicine"}>
          <Button variant="primary" className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>Add New</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-400">
          <div className="flex items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search medicines..."
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="ml-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1); // reset pagination
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

        {/*  Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-6 font-medium">Medicine</th>
                <th className="py-4 px-7 font-medium">Price</th>
                <th className="py-4 px-6 font-medium">Stock</th>
                <th className="py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productList?.length > 0 ? (
                productList?.map((product) => (
                  <tr key={product.id}>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          className="w-10 h-10 object-cover rounded mr-5"
                        />
                        <div>
                          <h3 className="font-medium">{product.productName}</h3>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-7">Rs. {product.price}</td>
                    <td className="py-4 px-7">{product.availableStock}</td>
                    <td className="py-4 px-7">
                      <div className="flex space-x-2">
                        <button className="p-1 text-primary hover:text-primary-hover">
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-1 text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No medicines found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/*  Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-400">
          <div className="text-gray-500 text-sm">
            Showing {productList?.length} of {totalProducts} medicines
          </div>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 border rounded border-gray-400"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              <ChevronLeft className="text-primary-hover" size={20} />
            </button>
            {totalPages > 0 && [...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 border rounded border-gray-400 ${
                  currentPage === idx + 1 ? "bg-primary text-white" : ""
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 border rounded border-gray-400"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              <ChevronRight className="text-primary-hover" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineList;
