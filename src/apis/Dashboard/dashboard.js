import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get Dashboard Overview
export const fetchDashboardOverview = async (token) => {
  try {
    const URL = `${API_URL}/dashboard/overview`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard overview:", error);
    throw error;
  }
};

// Get Medicines Dashboard
export const fetchMedicinesDashboard = async (token) => {
  try {
    const URL = `${API_URL}/dashboard/medicines`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching medicines dashboard:", error);
    throw error;
  }
};

// Get Orders Dashboard
export const fetchOrdersDashboard = async (token) => {
  try {
    const URL = `${API_URL}/dashboard/orders`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders dashboard:", error);
    throw error;
  }
};

// Get Complaints Dashboard
export const fetchComplaintsDashboard = async (token) => {
  try {
    const URL = `${API_URL}/dashboard/complaints`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching complaints dashboard:", error);
    throw error;
  }
};

// Get Alerts Dashboard
export const fetchAlertsDashboard = async (token) => {
  try {
    const URL = `${API_URL}/dashboard/alerts`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching alerts dashboard:", error);
    throw error;
  }
};

