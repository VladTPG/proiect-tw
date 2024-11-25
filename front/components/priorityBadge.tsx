import React from "react";
import { Flag } from 'lucide-react';

const priorityConfig = {
    1: {
        label: "Urgent",
        textColor: "text-red-500",
        borderColor: "border-red-300"
    },
    2: {
        label: "High",
        textColor: "text-yellow-500",
        borderColor: "border-yellow-300"
    },
    3: {
        label: "Normal",
        textColor: "text-blue-500",
        borderColor: "border-blue-300"
    },
    4: {
        label: "Low",
        textColor: "text-green-500",
        borderColor: "border-green-300"
    },
    5: {
        label: "Minimal",
        textColor: "text-gray-500",
        borderColor: "border-gray-300"
    },
};

export const PriorityBadge = ({ priority }) => {
    const { label, textColor, borderColor } = priorityConfig[priority];
    return (
        <div className={`flex items-center gap-2 px-2 py-1 text-sm font-normal border-2 rounded-xl ${borderColor}`}>
            <Flag size={14} className={textColor} />
            <span>{label}</span>
        </div>
    );
};

// Demo component to show all priorities
const PriorityDemo = () => (
    <div className="flex flex-col gap-2 p-4">
        {Object.keys(priorityConfig).map((priority) => (
            <PriorityBadge key={priority} priority={Number(priority)} />
        ))}
    </div>
);

export default PriorityDemo;