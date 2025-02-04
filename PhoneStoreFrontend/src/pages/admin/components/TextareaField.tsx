import React from "react";

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          ref={ref} // 👈 Thêm ref để react-hook-form hoạt động
          id={id}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...props} // 👈 Truyền tất cả props (bao gồm `rows`, `name`, ...)
        />
      </div>
    );
  }
);

// 👇 Fix cảnh báo React khi dùng forwardRef
TextareaField.displayName = "TextareaField";

export default TextareaField;
