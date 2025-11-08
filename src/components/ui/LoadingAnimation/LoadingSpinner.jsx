import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'default', 
  message = '', 
  className = '',
  showMessage = true,
  fullScreen = false 
}) => {
  // Size configurations
  const sizeConfig = {
    sm: { spinner: 16, text: 'text-sm' },
    md: { spinner: 24, text: 'text-base' },
    lg: { spinner: 32, text: 'text-lg' },
    xl: { spinner: 48, text: 'text-xl' }
  };

  // Variant configurations
  const variantConfig = {
    default: 'text-primary',
    white: 'text-white',
    gray: 'text-gray-500',
    success: 'text-green-500',
    error: 'text-red-500'
  };

  const spinnerSize = sizeConfig[size]?.spinner || 24;
  const textSize = sizeConfig[size]?.text || 'text-base';
  const spinnerColor = variantConfig[variant] || 'text-primary';

  // Full screen wrapper
  const FullScreenWrapper = ({ children }) => (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      {children}
    </div>
  );

  // Content
  const SpinnerContent = () => (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Loader2 
          size={spinnerSize} 
          className={`${spinnerColor} drop-shadow-sm`}
        />
      </motion.div>
      
      {showMessage && message && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${textSize} ${spinnerColor} font-medium tracking-wide`}
        >
          {message}
        </motion.p>
      )}
    </div>
  );

  // Return full screen or inline spinner
  if (fullScreen) {
    return (
      <FullScreenWrapper>
        <SpinnerContent />
      </FullScreenWrapper>
    );
  }

  return <SpinnerContent />;
};

// Preset loading components for common use cases
export const TableLoadingSpinner = ({ rows = 5 }) => (
  <tbody>
    {[...Array(rows)].map((_, index) => (
      <tr key={index} className="animate-pulse">
        <td className="py-5 px-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </td>
        <td className="py-5 px-6">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </td>
        <td className="py-5 px-6">
          <div className="h-6 bg-gray-200 rounded-full w-12"></div>
        </td>
        <td className="py-5 px-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
);

export const PageLoadingScreen = ({ message = "Loading..." }) => (
  <div className="min-h-screen bg-background p-5">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center py-20">
        <LoadingSpinner 
          size="xl" 
          message={message} 
          className="text-center"
        />
      </div>
    </div>
  </div>
);

export const OverlayLoadingSpinner = ({ message = "Loading..." }) => (
  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
    <LoadingSpinner 
      size="lg" 
      message={message}
    />
  </div>
);

export default LoadingSpinner;