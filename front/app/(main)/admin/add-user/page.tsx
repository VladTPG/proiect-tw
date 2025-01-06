"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { useToken } from "@/contexts/TokenContext";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type User from "@/types/user";

export default function AddUserPage() {
  const router = useRouter();
  const { user } = useUser();
  const { token } = useToken();
  const [formData, setFormData] = useState<Partial<User>>({
    displayName: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post("http://localhost:8000/auth", formData, config);
      router.push("/admin");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAdmin"
                checked={formData.isAdmin}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isAdmin: checked as boolean })
                }
              />
              <Label htmlFor="isAdmin">Is Admin</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Add User</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
