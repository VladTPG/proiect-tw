"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToken } from "@/contexts/TokenContext";

function AccountSettings() {
  const { user, setUser } = useUser();
  const { token } = useToken();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  const handleSave = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `http://localhost:8000/auth/${user?.id}`,
        { ...user, displayName, password: password },
        config
      )
      .then(() => {
        setUser({ ...user, displayName, password: password });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700"
            >
              Display Name
            </label>
            <Input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <Input
              id="newPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AccountSettings;
