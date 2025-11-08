import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import Button from "../Buttons/Button";

const ModalConfirmationAlert = ({
  isOpen = false,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Yes",
  cancelText = "Cancel",
  confirmVariant = "primary",
  cancelVariant = "secondary",
  isAsync = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const handleConfirm = async () => {
    if (isAsync) {
      setIsLoading(true);
      try {
        await onConfirm();
        onClose();
      } catch (error) {
        console.error("Error during confirmation:", error);
        // Keep modal open on error
      } finally {
        setIsLoading(false);
      }
    } else {
      onConfirm();
      onClose();
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 border border-gray-200/80 relative"
          >
            {/* Close Button */}
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="px-6 pt-6 pb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 pr-8">
                {title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {message}
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end border-t border-gray-100 pt-4">
              <Button
                variant={cancelVariant}
                size="md"
                onClick={handleCancel}
                className="min-w-[100px]"
                disabled={isLoading}
              >
                {cancelText}
              </Button>
              <Button
                variant={confirmVariant}
                size="md"
                onClick={handleConfirm}
                className="min-w-[100px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  confirmText
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalConfirmationAlert;