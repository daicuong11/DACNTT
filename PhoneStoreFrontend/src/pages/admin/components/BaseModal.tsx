interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-9999"
            onClick={() => onClose()}
            style={{ minHeight: '100vh' }}
        >
            <div
                className="bg-white rounded-lg shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default BaseModal;
