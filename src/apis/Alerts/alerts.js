import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all complaints with filters
export const fetchAllComplaints = async (token, filters = {}) => {
  try {
    const { status, city, store, batchId, page = 1, limit = 15 } = filters;
    
    // Build query string
    const queryParams = new URLSearchParams();
    if (status) queryParams.append("status", status);
    if (city) queryParams.append("city", city);
    if (store) queryParams.append("store", store);
    if (batchId) queryParams.append("batchId", batchId);
    queryParams.append("page", page);
    queryParams.append("limit", limit);

    const URL = `${API_URL}/complaints?${queryParams.toString()}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw error;
  }
};

// Fetch complaint by ID
export const fetchComplaintById = async (id, token) => {
  try {
    const URL = `${API_URL}/complaints/${id}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching complaint:", error);
    throw error;
  }
};

// Update complaint status and remarks
export const updateComplaintStatus = async (id, data, token) => {
  try {
    const URL = `${API_URL}/complaints/${id}`;
    const response = await axios.patch(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating complaint:", error);
    throw error;
  }
};

// Get batch complaint count
export const fetchBatchComplaintCount = async (batchId, token) => {
  try {
    const URL = `${API_URL}/complaints/batch/count?batchId=${batchId}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching batch count:", error);
    throw error;
  }
};

