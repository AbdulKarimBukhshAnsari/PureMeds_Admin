import  { useEffect, useState } from "react";

const ToastNotification = ({
  isVisible = false,
  type = "success", // "success" or "error"
  message = "",
  duration = 3000, // 3 seconds
  onClose
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => {
          onClose && onClose();
        }, 300); // Wait for animation to complete
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    if (type === "success") {
      return {
        bg: "bg-green-500",
        border: "border-green-600",
        icon: "✓"
      };
    } else {
      return {
        bg: "bg-red-500", 
        border: "border-red-600",
        icon: "✕"
      };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`
          ${styles.bg} ${styles.border} 
          text-white px-6 py-3 rounded-lg shadow-lg border
          flex items-center space-x-3 min-w-[300px] max-w-[500px]
          transition-all duration-300 ease-in-out
          ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
        `}
      >
        <div className="flex-shrink-0">
          <span className="text-lg font-bold">{styles.icon}</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setShow(false);
            setTimeout(() => onClose && onClose(), 300);
          }}
          className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
        >
          <span className="text-lg">×</span>
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;