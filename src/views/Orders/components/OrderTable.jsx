import React from "react";
import { ExternalLink, Loader2, Package } from "lucide-react";

const OrderTable = ({ orders, loading, onRowClick }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
      },
      confirmed: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
      },
      processing: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        border: "border-purple-200",
      },
      shipped: {
        bg: "bg-indigo-100",
        text: "text-indigo-800",
        border: "border-indigo-200",
      },
      delivered: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
      },
      returned: {
        bg: "bg-orange-100",
        text: "text-orange-800",
        border: "border-orange-200",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} ${config.border} border`}
      >
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "N/A"}
      </span>
    );
  };

  const truncateName = (name, maxLength = 15) => {
    if (!name) return "";
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 min-h-[400px]">
        <div className="flex flex-col items-center justify-center">
          <Loader2 size={32} className="animate-spin text-primary mb-4" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 min-h-[400px]">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Package size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg mb-2">No orders found</p>
          <p className="text-gray-400">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-t-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-y border-gray-200">
            <tr>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Order ID
              </th>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                User ID
              </th>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Products
              </th>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Total Price
              </th>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Status
              </th>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Date Created
              </th>
              <th className="py-5 px-6 font-semibold text-gray-700 text-md uppercase tracking-wider text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order, index) => (
              <tr
                key={order._id}
                onClick={() => onRowClick(order)}
                className="hover:bg-blue-50/30 transition-all duration-200 group cursor-pointer"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animation: "slideInUp 0.3s ease-out forwards",
                }}
              >
                <td className="py-5 px-6">
                  <span className="text-md font-medium text-gray-900 whitespace-nowrap ">
                    {order.orderId || "N/A"}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <span className="text-gray-700 font-mono text-xs truncate block max-w-[120px]">
                    {order.userId || "N/A"}
                  </span>
                </td>
                <td className="py-5 px-6">
                  {order.products && order.products.length > 0 ? (
                    <div className="space-y-1">
                      {order.products.slice(0, 2).map((product, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-gray-700 truncate"
                        >
                          {truncateName(product.productName)} (Qty:{" "}
                          {product.quantity})
                        </div>
                      ))}
                      {order.products.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{order.products.length - 2} more
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">No products</span>
                  )}
                </td>
                <td className="py-5 px-6">
                  <span className="text-md font-medium text-gray-900">
                    Rs. {order.totalAmount || 0}
                  </span>
                </td>
                <td className="py-5 px-6">{getStatusBadge(order.status)}</td>
                <td className="py-5 px-6">
                  <span className="text-gray-600 text-sm">
                    {formatDate(order.createdAt)}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick(order);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover transform transition-all duration-200 hover:scale-105 hover:shadow-md group/btn cursor-pointer"
                  >
                    View
                    <ExternalLink
                      size={14}
                      className="group-hover/btn:translate-x-0.5 transition-transform"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
