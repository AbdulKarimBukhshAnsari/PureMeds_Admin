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
  icon: Icon = Calendar,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  );
  const datePickerRef = useRef(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
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

  const { daysInMonth, startingDayOfWeek, year, month } =
    getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(year, month, day);
    if (minDate && selectedDate < new Date(minDate)) return;
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
      year: "numeric",
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
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X size={12} className="text-gray-500" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.94 }}
              transition={{ duration: 0.16 }}
              className="absolute z-50 mt-1 bg-white rounded-md shadow-lg border border-gray-200 p-2 min-w-[180px] w-[250px]"
            >
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-1.5">
                <button
                type="button"
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-primary/10 rounded"
                >
                  <ChevronLeft size={16} className="text-primary" />
                </button>

                <h3 className="font-semibold text-gray-800 text-md">
                  {months[month].slice(0, 3)} {year}
                </h3>

                <button
                type="button"
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-primary/10 rounded"
                >
                  <ChevronRight size={16} className="text-primary" />
                </button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-0.5 mb-1">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-semibold text-gray-500"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the first day of month */}
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

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
                      whileHover={!disabled ? { scale: 1.05 } : {}}
                      whileTap={!disabled ? { scale: 0.9 } : {}}
                      className={`
                        h-6 w-6 flex items-center justify-center rounded text-xs
                        ${selected
                          ? "bg-primary text-white"
                          : today
                          ? "bg-primary/10 text-primary border border-primary"
                          : disabled
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-700 hover:bg-primary/10"
                        }
                      `}
                    >
                      {day}
                    </motion.button>
                  );
                })}
              </div>

              {/* Today Button */}
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  if (!minDate || today >= new Date(minDate)) {
                    onChange(today);
                    setIsOpen(false);
                  }
                }}
                className="w-full mt-2 py-1 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded"
              >
                Today
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DatePicker;
