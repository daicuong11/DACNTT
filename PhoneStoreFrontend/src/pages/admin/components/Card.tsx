import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
    button?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, button }) => {
    return (
        <div className="max-w mx-auto">
            <div className="border rounded-lg shadow-lg bg-white">
                <div
                    className="mx-4 py-3 cursor-pointer rounded-t-lg border-b flex justify-between"
                >
                    <div className="flex items-center text-black font-bold text-lg">
                        <span className="capitalize">{title}</span>
                    </div>
                    {button && (
                        <div onClick={(e) => e.stopPropagation()}>{button}</div>
                    )}
                </div>
                <div className="p-4 text-gray-700">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Card;
