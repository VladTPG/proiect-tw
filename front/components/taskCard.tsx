"use client";

import type { Task as TaskType } from "@/dummy-data/tasks";
import users from "@/dummy-data/users";
import React from "react";
import { PriorityBadge } from "@/components/priorityBadge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreVertical,
  Clock,
  CheckCircle2,
  Circle,
  CircleDashed,
  XCircle,
} from "lucide-react";

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "Completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "In Progress":
      return <CircleDashed className="h-4 w-4 text-blue-500" />;
    case "Not Started":
      return <Circle className="h-4 w-4 text-gray-500" />;
    case "Pending Review":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    default:
      return <XCircle className="h-4 w-4 text-red-500" />;
  }
};

interface TaskCardProps {
  task: TaskType;
  isSelected: boolean;
  onToggleSelect: () => void;
}

export default function TaskCard({
  task,
  isSelected,
  onToggleSelect,
}: TaskCardProps) {
  return (
    <tr className="border-b hover:bg-muted/50 group">
      <td className="w-[40px] p-4">
        <Checkbox checked={isSelected} onCheckedChange={onToggleSelect} />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <span className="font-medium text-sm">{task.title}</span>
          <PriorityBadge priority={task.priority} />
        </div>
      </td>
      <td className="p-4 text-sm text-muted-foreground">{task.description}</td>
      <td className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <StatusIcon status={task.status} />
          <span>{task.status}</span>
        </div>
      </td>
      <td className="p-4 text-sm text-muted-foreground">
        {task.userFK
          ? users.find((user) => user.id === task.userFK)?.displayName
          : "Unassigned"}
      </td>
      <td className="p-4 text-sm text-muted-foreground">
        {task.deadline.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>
      <td className="w-[40px] p-4">
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="h-5 w-5 text-muted-foreground" />
        </button>
      </td>
    </tr>
  );
}
