import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchMedicineList = async (token , page = 1 , search = "" , category = "") => {
  try {
    const URL = `${API_URL}/products?page=${page}&search=${search}&category=${category}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching medicine list:", error);
    throw error;
  }
};

export const deleteMedicine = async (id, token) => {
  try {
    const URL = `${API_URL}/products/${id}`;
    const response = await axios.delete(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting medicine:", error);
    throw error;
  }
};
