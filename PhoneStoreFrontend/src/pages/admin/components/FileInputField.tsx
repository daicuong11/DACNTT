import React from "react";

interface FileInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const FileInputField = React.forwardRef<HTMLInputElement, FileInputFieldProps>(
    ({ label, id, ...props }, ref) => {
        return (
            <div className="mb-4">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <input
                    ref={ref} // 👈 Thêm ref vào input
                    type="file"
                    id={id}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    {...props} // 👈 Truyền tất cả props từ `register()`
                />
            </div>
        );
    }
);

// 👇 Fix cảnh báo React khi dùng forwardRef
FileInputField.displayName = "FileInputField";

export default FileInputField;
