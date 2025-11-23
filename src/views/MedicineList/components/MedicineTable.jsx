import React from "react";
import { Package } from "lucide-react";
import MedicineTableRow from "./MedicineTableRow";

const MedicineTable = ({ productList, onView, onDelete }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="overflow-x-auto hide-scrollbar ">
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
                Batch ID
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
                <MedicineTableRow
                  key={product._id}
                  product={product}
                  index={index}
                  onView={onView}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-16">
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
  );
};

export default MedicineTable;

