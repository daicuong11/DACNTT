import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface SelectOption {
    label: string;
    value: any;
}

interface SelectProps {
    options: SelectOption[];
    placeholder?: string;
    onSelect: (option: SelectOption) => void;
    label?: string;
}

export default function Select({ options, placeholder, onSelect, label }: SelectProps) {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<SelectOption | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const filteredOptions = query === ""
        ? options
        : options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));

    const handleSelect = (option: SelectOption) => {
        setSelected(option);
        onSelect(option);
        setIsOpen(false);
        setQuery("");
    };
    return (
        <div className="relative w-full">
            {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
            <div
                className="flex items-center justify-between bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={selected ? "text-black" : "text-gray-400"}>
                    {selected ? selected.label : placeholder || "Select an option"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
            {isOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <input
                        type="text"
                        className="w-full px-3 py-2 border-b outline-none sm:text-sm"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <ul className="max-h-40 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.value}
                                    className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100 sm:text-sm"
                                    onClick={() => handleSelect(option)}
                                >
                                    {option.label}
                                    {selected?.value === option.value && <Check className="w-4 h-4 text-blue-500" />}
                                </li>
                            ))
                        ) : (
                            <li className="px-3 py-2 text-gray-500 sm:text-sm">No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
