import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { X, Calendar, Hash, User, Save, Loader2, DollarSign, Package, CreditCard, Truck, MapPin, Phone, Mail } from "lucide-react";
import { fetchOrderById } from "../../../apis/Orders/orders";

const OrderModal = ({ order, isOpen, onClose, onUpdate }) => {
  const { getToken } = useAuth();
  const [status, setStatus] = useState(order?.status || "pending");
  const [adminRemarks, setAdminRemarks] = useState(order?.adminRemarks || "");
  const [saving, setSaving] = useState(false);
  const [fullOrder, setFullOrder] = useState(order);

  useEffect(() => {
    if (order) {
      setStatus(order.status);
      setAdminRemarks(order.adminRemarks || "");
      fetchFullOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, isOpen]);

  const fetchFullOrder = async () => {
    if (!order?._id) return;
    try {
      const token = await getToken();
      const response = await fetchOrderById(order._id, token);
      setFullOrder(response?.data || order);
    } catch (error) {
      console.error("Error fetching full order:", error);
      setFullOrder(order);
    }
  };

  const handleSave = async () => {
    if (!order) return;

    setSaving(true);
    try {
      await onUpdate(order._id, {
        status,
        adminRemarks,
      });
      onClose();
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !order) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (statusValue) => {
    const statusConfig = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
      confirmed: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
      processing: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
      shipped: { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-200" },
      delivered: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
      cancelled: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
      returned: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
    };
    const config = statusConfig[statusValue] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} ${config.border} border`}>
        {statusValue ? statusValue.charAt(0).toUpperCase() + statusValue.slice(1) : "N/A"}
      </span>
    );
  };

  const orderData = fullOrder || order;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-primary to-primary-hover text-white px-6 py-4 rounded-t-2xl">
          <h3 className="text-xl font-semibold tracking-wide">
            Order Details – {orderData.orderId || "N/A"}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition p-1 rounded-lg hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body - Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* Main Grid Layout - 3 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left Column - Basic Info & Customer Info */}
              <div className="lg:col-span-2 space-y-4">
                {/* Basic Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-3">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Order ID</p>
                      <p className="font-medium text-gray-900 font-mono">{orderData.orderId || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">User ID</p>
                      <p className="font-medium text-gray-900 font-mono text-xs break-all">{orderData.userId || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Status</p>
                      <div>{getStatusBadge(status)}</div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Payment Method</p>
                      <p className="font-medium text-gray-900 capitalize">{orderData.paymentMethod || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Created At</p>
                      <p className="font-medium text-gray-900 text-xs">{formatDate(orderData.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                {orderData.customerInfo && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">Customer Information</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Name</p>
                        <p className="font-medium text-gray-900">
                          {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Email</p>
                        <p className="font-medium text-gray-900">{orderData.customerInfo.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Phone</p>
                        <p className="font-medium text-gray-900">{orderData.customerInfo.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">City</p>
                        <p className="font-medium text-gray-900">{orderData.customerInfo.city}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500 text-xs mb-1">Address</p>
                        <p className="font-medium text-gray-900">
                          {orderData.customerInfo.address}, {orderData.customerInfo.city}, {orderData.customerInfo.state} {orderData.customerInfo.zip}, {orderData.customerInfo.country}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Products Information */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-3">Products</h4>
                  <div className="space-y-3">
                    {orderData.products && orderData.products.length > 0 ? (
                      orderData.products.map((product, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{product.productName}</p>
                              {product.productId && product.productId.batchId && (
                                <p className="text-xs text-gray-500 font-mono mt-1">Batch: {product.productId.batchId}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                              <p className="text-sm font-medium text-gray-900">Rs. {product.price} each</p>
                              <p className="text-sm font-semibold text-primary mt-1">
                                Total: Rs. {product.quantity * product.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No products found</p>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-3">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">Rs. {orderData.subtotal || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">Rs. {orderData.shipping || 0}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="font-semibold text-gray-900">Total Amount</span>
                      <span className="font-bold text-primary text-lg">Rs. {orderData.totalAmount || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Admin Actions */}
              <div className="space-y-4">
                {/* Admin Actions */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-3">Admin Actions</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Change Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm bg-white text-gray-900"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="returned">Returned</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Admin Remarks
                      </label>
                      <textarea
                        value={adminRemarks}
                        onChange={(e) => setAdminRemarks(e.target.value)}
                        placeholder="Add your remarks here..."
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm bg-white text-gray-900 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-white rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover transform transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center gap-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;

