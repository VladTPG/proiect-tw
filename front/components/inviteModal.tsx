"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToken } from "@/contexts/TokenContext";
import axios from "axios";
import User from "@/types/user";

interface InviteModalProps {
  projectId: number;
  onInviteSent: () => void;
}

export function InviteModal({ projectId, onInviteSent }: InviteModalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const { token } = useToken();
  const [formData, setFormData] = useState({
    userId: "",
    status: "Pending",
    date: new Date().toISOString(),
  });

  useEffect(() => {
    if (token && open) {
      fetchUsers();
    }
  }, [token, open]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
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

  const handleInvite = async () => {
    if (!formData.userId || !token) return;

    try {
      await axios.post(
        "http://localhost:8000/invitation",
        {
          projectId: projectId,
          userId: parseInt(formData.userId),
          status: formData.status,
          date: formData.date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOpen(false);
      setFormData({
        userId: "",
        status: "Pending",
        date: new Date().toISOString(),
      });
      onInviteSent();
    } catch (error) {
      console.error("Error sending invitation:", error);
      alert("Failed to send invitation. Please try again.");
    }
  };

  const getSelectedUserName = () => {
    if (!formData.userId) return "Select a user";
    const selectedUser = users.find(
      (user) => user.id?.toString() === formData.userId
    );
    return selectedUser?.displayName || "Select a user";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Invite User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite User to Project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={formData.userId} onValueChange={handleUserChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a user">
                {getSelectedUserName()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id?.toString() || ""}>
                  {user.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleInvite} className="w-full">
            Send Invitation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
