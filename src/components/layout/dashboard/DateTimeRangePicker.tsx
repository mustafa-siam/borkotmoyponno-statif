// components/ui/DateTimePicker.tsx
"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateTimePickerProps = {
  label?: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  selectedDate,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        showTimeSelect
        timeIntervals={15}
        dateFormat="Pp"
        placeholderText="Select date and time"
        className="border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
};

export default DateTimePicker;
