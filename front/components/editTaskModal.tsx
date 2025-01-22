"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToken } from "@/contexts/TokenContext";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";

interface User {
  id: number;
  displayName: string;
  email: string;
}

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

interface EditTaskModalProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskUpdated: () => void;
}

export function EditTaskModal({
  task,
  open,
  onOpenChange,
  onTaskUpdated,
}: EditTaskModalProps) {
  const { token } = useToken();
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "Not Started",
    priority: "4",
    userId: "",
  });

  useEffect(() => {
    if (task && open) {
      const date = new Date(task.deadline);
      const formattedDate = date.toISOString().slice(0, 16);

      setFormData({
        title: task.title,
        description: task.description,
        deadline: formattedDate,
        status: task.status,
        priority: task.priority.toString(),
        userId: task.userId ? task.userId.toString() : "unassigned",
      });
    }
  }, [task, open]);

  // Update the useEffect for fetching users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:8000/auth", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Users response in edit modal:", response.data);
        // The response.data is already the array of users
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Invalid users data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (open) {
      fetchUsers();
    }
  }, [token, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !token) return;

    try {
      const response = await axios.put(
        `http://localhost:8000/task/update/${task.id}`,
        {
          task: {
            id: task.id,
            ...formData,
            userId:
              formData.userId === "unassigned"
                ? null
                : parseInt(formData.userId),
            priority: parseInt(formData.priority),
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.ok) {
        onTaskUpdated();
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error("Error updating task:", error);
      alert(error.response?.data?.error || "Failed to update task");
    }
  };

  const handleStatusChange = (value: string) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        status: value,
      }));
    }
  };

  const handlePriorityChange = (value: string) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        priority: value,
      }));
    }
  };

  const handleUserChange = (value: string) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        userId: value,
      }));
    }
  };

  const priorityLabels: { [key: string]: string } = {
    "1": "Critical",
    "2": "Urgent",
    "3": "High",
    "4": "Medium",
    "5": "Low",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full" id="status">
                <SelectValue>{formData.status || "Select status"}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={handlePriorityChange}
            >
              <SelectTrigger className="w-full" id="priority">
                <SelectValue>
                  {priorityLabels[formData.priority] || "Select priority"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="1">Critical</SelectItem>
                <SelectItem value="2">Urgent</SelectItem>
                <SelectItem value="3">High</SelectItem>
                <SelectItem value="4">Medium</SelectItem>
                <SelectItem value="5">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="userId">Assigned To</Label>
            <Select value={formData.userId} onValueChange={handleUserChange}>
              <SelectTrigger className="w-full" id="userId">
                <SelectValue>
                  {formData.userId === "unassigned"
                    ? "Unassigned"
                    : users.find((u) => u.id.toString() === formData.userId)
                        ?.displayName || "Select user"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Update Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
