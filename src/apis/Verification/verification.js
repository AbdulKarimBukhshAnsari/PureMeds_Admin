import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ;


export const verifyMedicineByQRCode = async (qrImageFile, token) => {
  try {
    const formData = new FormData();
    formData.append("qrCode", qrImageFile);
    
    const response = await axios.post(
      `${API_URL}/verify/qrcode`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error verifying medicine by QR:", error);
    throw error.response?.data || error;
  }
};


export const verifyMedicineByHash = async (hash, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/verify/hash`,
      { hash },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error verifying medicine by hash:", error);
    throw error.response?.data || error;
  }
};

export const verifyQRData = async (qrData, token) => {
  try {
    // Parse QR data
    const parsedData = JSON.parse(qrData);
    
    if (!parsedData.hash) {
      throw new Error("Invalid QR code format - missing hash");
    }
    
    // Verify using hash
    return await verifyMedicineByHash(parsedData.hash, token);
  } catch (error) {
    if (error.message.includes("JSON")) {
      throw new Error("Invalid QR code format - not a PureMeds QR code");
    }
    throw error;
  }
};
