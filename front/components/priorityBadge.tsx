import React from "react";
import { Flag } from "lucide-react";

const priorityConfig = {
  1: {
    label: "Urgent",
    textColor: "text-red-500",
    borderColor: "border-red-300",
  },
  2: {
    label: "High",
    textColor: "text-yellow-500",
    borderColor: "border-yellow-300",
  },
  3: {
    label: "Normal",
    textColor: "text-blue-500",
    borderColor: "border-blue-300",
  },
  4: {
    label: "Low",
    textColor: "text-green-500",
    borderColor: "border-green-300",
  },
  5: {
    label: "Minimal",
    textColor: "text-gray-500",
    borderColor: "border-gray-300",
  },
};

interface PriorityBadgeProps {
  priority: number;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const getBadgeColor = (priority: number) => {
    switch (priority) {
      case 1: // Critical
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case 2: // Urgent
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case 3: // High
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case 4: // Medium
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case 5: // Low
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1:
        return "Critical";
      case 2:
        return "Urgent";
      case 3:
        return "High";
      case 4:
        return "Medium";
      case 5:
        return "Low";
      default:
        return "Unknown";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getBadgeColor(
        priority
      )}`}
    >
      {getPriorityLabel(priority)}
    </span>
  );
}

// Demo component to show all priorities
const PriorityDemo = () => (
  <div className="flex flex-col gap-2 p-4">
    {Object.keys(priorityConfig).map((priority) => (
      <PriorityBadge key={priority} priority={Number(priority)} />
    ))}
  </div>
);

export default PriorityDemo;
