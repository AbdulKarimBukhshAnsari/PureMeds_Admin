import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all orders with filters
export const fetchAllOrders = async (token, filters = {}) => {
  try {
    const { status, userId, productName, batchId, orderId, startDate, endDate, page = 1, limit = 10 } = filters;
    
    // Build query string
    const queryParams = new URLSearchParams();
    if (status) queryParams.append("status", status);
    if (userId) queryParams.append("userId", userId);
    if (productName) queryParams.append("productName", productName);
    if (batchId) queryParams.append("batchId", batchId);
    if (orderId) queryParams.append("orderId", orderId);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    queryParams.append("page", page);
    queryParams.append("limit", limit);

    const URL = `${API_URL}/orders?${queryParams.toString()}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Fetch order by ID
export const fetchOrderById = async (id, token) => {
  try {
    const URL = `${API_URL}/orders/${id}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

// Update order status and remarks
export const updateOrderStatus = async (id, data, token) => {
  try {
    const URL = `${API_URL}/orders/${id}`;
    const response = await axios.patch(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// Export orders to CSV
export const exportOrdersCSV = async (filters, token) => {
  try {
    const { status, userId, startDate, endDate } = filters;
    
    const queryParams = new URLSearchParams();
    if (status) queryParams.append("status", status);
    if (userId) queryParams.append("userId", userId);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);

    const URL = `${API_URL}/orders/export/csv?${queryParams.toString()}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });
    
    // Create download link
    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orders_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error("Error exporting orders:", error);
    throw error;
  }
};

