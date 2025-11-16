import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, totalComplaints, complaintListLength, onPageChange }) => {
  if (complaintListLength === 0) return null;

  return (
    <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white">
      <div className="text-gray-600 text-sm mb-4 sm:mb-0">
        Showing {complaintListLength} of {totalComplaints} complaints
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        >
          <ChevronLeft
            size={20}
            className={currentPage === 1 ? "text-gray-400" : "text-primary"}
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
              onClick={() => onPageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        <button
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        >
          <ChevronRight
            size={20}
            className={
              currentPage === totalPages ? "text-gray-400" : "text-primary"
            }
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

