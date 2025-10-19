import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const uploadMedicine = async (formData, token) => {
  try {
    const URL = `${API_URL}/uploadproducts`;
    const response = await axios.post(URL, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading medicine:", error);
    throw error;
  }
};