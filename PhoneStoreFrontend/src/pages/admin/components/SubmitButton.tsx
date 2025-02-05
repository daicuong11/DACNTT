import React from 'react';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, disabled = false, ...props }) => {
    return (
        <button
            type="submit"
            disabled={disabled} // Gán disabled vào button
            className={`btn btn-primary 
            ${disabled ? "opacity-50 cursor-not-allowed" : " "}`}
            {...props} // Truyền tất cả props khác vào button
        >
            {text}
        </button>
    );
};

export default SubmitButton;

