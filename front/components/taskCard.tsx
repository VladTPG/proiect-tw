"use client";

import React, { useState, useEffect } from "react";
import { PriorityBadge } from "@/components/priorityBadge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreVertical,
  Clock,
  CheckCircle2,
  Circle,
  CircleDashed,
  XCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToken } from "@/contexts/TokenContext";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
  priority: number;
  userId: number | null;
  projectId: number;
}

interface User {
  id: number;
  displayName: string;
}

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
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  isManager: boolean;
  currentUserId: number;
  isSelected?: boolean;
  onToggleSelect?: () => void;
}

const priorityLabels: { [key: number]: string } = {
  1: "Critical",
  2: "Urgent",
  3: "High",
  4: "Medium",
  5: "Low",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  isManager,
  currentUserId,
  onTaskUpdated,
}: TaskCardProps & { onTaskUpdated: () => void }) {
  const { token } = useToken();
  const [users, setUsers] = useState<User[]>([]);
  const [isSubmittingForReview, setIsSubmittingForReview] = useState(false);

  const isAssignedToCurrentUser = task.userId === currentUserId;
  const canSubmitForReview =
    isAssignedToCurrentUser && !isManager && task.status !== "Pending Review";

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      try {
        const response = await axios.get("http://localhost:8000/auth", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const getAssigneeName = (userId: number | null) => {
    if (!userId) return "Unassigned";
    const assignee = users.find((u) => u.id === userId);
    return assignee ? assignee.displayName : "Unknown User";
  };

  const handleSubmitForReview = async () => {
    if (!token || !task) return;

    setIsSubmittingForReview(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/task/update/${task.id}`,
        {
          task: {
            id: task.id,
            status: "Pending Review",
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            priority: task.priority,
            projectId: task.projectId,
            userId: task.userId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        onTaskUpdated();
      } else {
        throw new Error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error submitting task for review:", error);
      alert(error.response?.data?.error || "Failed to submit task for review");
    } finally {
      setIsSubmittingForReview(false);
    }
  };

  return (
    <>
      <td className="px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{task.title}</span>
          <PriorityBadge priority={task.priority} />
        </div>
      </td>
      <td className="px-4 py-2">{task.description}</td>
      <td className="px-4 py-2">
        <div className="flex items-center gap-2">
          <StatusIcon status={task.status} />
          <span>{task.status}</span>
          {canSubmitForReview && (
            <div className="flex items-center gap-2">
              <Checkbox
                id={`submit-review-${task.id}`}
                checked={task.status === "Pending Review"}
                disabled={isSubmittingForReview}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleSubmitForReview();
                  }
                }}
              />
              <Label
                htmlFor={`submit-review-${task.id}`}
                className="text-sm text-gray-600"
              >
                Submit for Review
              </Label>
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-2">{getAssigneeName(task.userId)}</td>
      <td className="px-4 py-2">
        {new Date(task.deadline).toLocaleDateString()}
      </td>
      <td className="px-4 py-2">
        {isManager && (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )}
      </td>
    </>
  );
}
