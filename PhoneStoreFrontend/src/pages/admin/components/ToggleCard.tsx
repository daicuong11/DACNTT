import { CaretDownFilled, CaretRightFilled } from "@ant-design/icons";
import { useState } from "react";

interface ToggleCardProps {
    title: string;
    children: React.ReactNode;
    button?: React.ReactNode;
}

export default function ToggleCard({ children, title, button }: ToggleCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="max-w mx-auto">
            <div className="border rounded-lg shadow-lg bg-white">
                <div
                    className="mx-4 py-3 cursor-pointer rounded-t-lg border-b flex justify-between"
                    onClick={toggleCard}
                >
                    <div className="flex items-center text-black font-bold text-lg">
                        {isOpen ? <CaretDownFilled /> : <CaretRightFilled />}
                        <span className="ml-2 capitalize">{title}</span>
                    </div>
                    {button && (
                        <div onClick={(e) => e.stopPropagation()}>{button}</div>
                    )}
                </div>
                {isOpen && (
                    <div className="p-4 text-gray-700">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
