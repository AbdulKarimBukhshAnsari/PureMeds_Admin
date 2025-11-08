import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        bg: "bg-white",
        border: "border-green-200",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        textColor: "text-gray-900",
        icon: CheckCircle2,
        accent: "border-l-4 border-l-green-500"
      };
    } else {
      return {
        bg: "bg-white",
        border: "border-red-200",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        textColor: "text-gray-900",
        icon: XCircle,
        accent: "border-l-4 border-l-red-500"
      };
    }
  };

  const styles = getTypeStyles();
  const IconComponent = styles.icon;

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`
              ${styles.bg} ${styles.border} ${styles.accent}
              border rounded-2xl shadow-2xl
              flex items-center gap-4 min-w-[320px] max-w-[420px]
              px-5 py-4
              backdrop-blur-sm
            `}
          >
            <div className={`flex-shrink-0 ${styles.iconBg} p-2 rounded-full`}>
              <IconComponent size={20} className={styles.iconColor} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${styles.textColor} leading-relaxed`}>
                {message}
              </p>
            </div>
            <button
              onClick={() => {
                setShow(false);
                setTimeout(() => onClose && onClose(), 300);
              }}
              className={`flex-shrink-0 ${styles.textColor} hover:opacity-70 transition-opacity p-1 rounded-lg hover:bg-gray-100`}
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToastNotification;