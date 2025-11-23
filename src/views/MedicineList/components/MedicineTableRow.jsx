import React from "react";
import { motion } from "framer-motion";
import { Eye, Trash2 } from "lucide-react";

const MedicineTableRow = ({ product, index, onView, onDelete }) => {
  return (
    <motion.tr
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
        <span className="text-md font-medium text-gray-900 font-mono text-sm">
          {product.batchId || "N/A"}
        </span>
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
            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer"
            title="View Details"
            onClick={() => onView(product)}
          >
            <Eye size={18} />
          </button>
          <button
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer"
            onClick={() => onDelete(product._id)}
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default MedicineTableRow;
