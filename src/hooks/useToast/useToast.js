import { useState } from "react";

export const useToast = () => {
  const [toast, setToast] = useState({
    isVisible: false,
    type: "success",
    message: "",
    duration: 3000
  });

  const showSuccess = (message, duration = 3000) => {
    setToast({
      isVisible: true,
      type: "success",
      message,
      duration
    });

  };

  const showError = (message, duration = 3000) => {
    setToast({
      isVisible: true,
      type: "error", 
      message,
      duration
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return [
    toast,
    showSuccess,
    showError,
    hideToast
  ];
};