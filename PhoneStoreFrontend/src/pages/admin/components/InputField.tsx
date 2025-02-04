import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, id, ...props }, ref) => {
        return (
            <div className="mb-4">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <input
                    ref={ref} // 👈 Gán ref vào input để `register` có thể truy cập
                    id={id}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...props} // 👈 Truyền tất cả props (bao gồm `type`, `name`, ...)
                />
            </div>
        );
    }
);

// 👇 Để tránh cảnh báo của React khi dùng forwardRef
InputField.displayName = "InputField";

export default InputField;
