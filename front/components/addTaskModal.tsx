"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus } from "lucide-react";
import User from "@/types/user";

interface AddTaskModalProps {
  projectId: number;
  onTaskAdded: () => void;
}

export function AddTaskModal({ projectId, onTaskAdded }: AddTaskModalProps) {
  const [open, setOpen] = useState(false);
  const { token } = useToken();
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "Not Started",
    priority: "4",
    userId: user?.id?.toString() || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate deadline is not in the past
      const deadline = new Date(formData.deadline);
      if (deadline < new Date()) {
        alert("Deadline cannot be in the past!");
        return;
      }

      const payload = {
        task: {
          title: formData.title.trim(),
          description: formData.description.trim(),
          deadline: formData.deadline,
          status: formData.status,
          priority: parseInt(formData.priority),
          projectId: projectId,
          userId:
            formData.userId === "unassigned" ? null : parseInt(formData.userId),
        },
      };

      console.log("Sending payload:", payload);

      const response = await axios.post(`http://localhost:8000/task`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Server response:", response.data);
      setOpen(false); // Close modal first
      await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay to ensure modal is closed
      onTaskAdded(); // Then refresh the task list
    } catch (error: any) {
      console.error("Error adding task:", error);
      if (error.response) {
        console.error("Server error response:", error.response.data);
        alert(error.response.data.error || "Failed to create task");
      } else {
        alert("Network error occurred while creating task");
      }
    }
  };

  const handleStatusChange = (value: string) => {
    console.log("Status changing to:", value);
    if (value) {
      setFormData((prev) => ({
        ...prev,
        status: value,
      }));
    }
  };

  const handlePriorityChange = (value: string) => {
    console.log("Priority changing to:", value);
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

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        title: "",
        description: "",
        deadline: "",
        status: "Not Started",
        priority: "4",
        userId: user?.id?.toString() || "",
      });
    }
  }, [open]);

  // Add useEffect to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:8000/auth", {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  useEffect(() => {
    if (user?.id) {
      setFormData((prev) => ({
        ...prev,
        userId: user.id.toString(),
      }));
    }
  }, [user?.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
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
            <Select
              defaultValue="Not Started"
              value={formData.status}
              onValueChange={handleStatusChange}
            >
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
              defaultValue="4"
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
                  {users.find((u) => u.id.toString() === formData.userId)
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
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
