import React from 'react';

interface SubmitButtonProps {
    text: string;
    disabled?: boolean; // Thêm prop disabled
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, disabled = false }) => {
    return (
            <button
                type="submit"
                disabled={disabled} // Gán disabled vào button
                className={`btn btn-primary 
            ${disabled ? "opacity-50 cursor-not-allowed" : " "}`}
            >
                {text}
            </button>
    );
};

export default SubmitButton;

