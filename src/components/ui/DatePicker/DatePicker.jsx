import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DatePicker = ({ 
  value, 
  onChange, 
  placeholder = "Select date", 
  error = false,
  minDate = null,
  label = "",
  icon: Icon = Calendar
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
  const datePickerRef = useRef(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(year, month, day);
    
    // Check if date is before minDate
    if (minDate && selectedDate < new Date(minDate)) {
      return; // Don't select dates before minDate
    }

    onChange(selectedDate);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", { 
      day: "2-digit", 
      month: "short", 
      year: "numeric" 
    });
  };

  const isDateDisabled = (day) => {
    if (!minDate) return false;
    const checkDate = new Date(year, month, day);
    return checkDate < new Date(minDate);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day) => {
    if (!value) return false;
    const selected = new Date(value);
    return (
      day === selected.getDate() &&
      month === selected.getMonth() &&
      year === selected.getFullYear()
    );
  };

  return (
    <div className="space-y-2" ref={datePickerRef}>
      {label && (
        <label className="flex items-center gap-2 text-md font-semibold text-gray-700">
          <Icon size={16} className="text-primary" />
          {label}
        </label>
      )}
      
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white cursor-pointer flex items-center justify-between ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : isOpen
              ? "border-primary ring-2 ring-primary/20"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <Calendar size={18} className={value ? "text-primary" : "text-gray-400"} />
            <span className={value ? "text-gray-900" : "text-gray-400"}>
              {value ? formatDate(value) : placeholder}
            </span>
          </div>
          {value && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-full min-w-[320px]"
            >
              {/* Month/Year Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} className="text-primary" />
                </button>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900">
                    {months[month]} {year}
                  </h3>
                </div>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} className="text-primary" />
                </button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-semibold text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the first day of month */}
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const disabled = isDateDisabled(day);
                  const today = isToday(day);
                  const selected = isSelected(day);

                  return (
                    <motion.button
                      key={day}
                      type="button"
                      onClick={() => !disabled && handleDateSelect(day)}
                      disabled={disabled}
                      whileHover={!disabled ? { scale: 1.1 } : {}}
                      whileTap={!disabled ? { scale: 0.95 } : {}}
                      className={`
                        aspect-square rounded-lg text-sm font-medium transition-all duration-200
                        ${selected
                          ? "bg-primary text-white shadow-md"
                          : today
                          ? "bg-primary/10 text-primary border-2 border-primary"
                          : disabled
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-primary/10 text-gray-700"
                        }
                      `}
                    >
                      {day}
                    </motion.button>
                  );
                })}
              </div>

              {/* Today Button */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    const today = new Date();
                    if (!minDate || today >= new Date(minDate)) {
                      onChange(today);
                      setIsOpen(false);
                    }
                  }}
                  className="w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors"
                >
                  Today
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DatePicker;
