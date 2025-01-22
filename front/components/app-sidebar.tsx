"use client";

import React, { useState } from "react";
import {
  Calendar,
  CheckSquare,
  Folder,
  Gauge,
  LogOut,
  Mail,
  Settings,
  Users,
  Plus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Select40 from "@/components/dropdownSelector";
import { useUser } from "@/contexts/UserContext";
import { useToken } from "@/contexts/TokenContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useProject } from "@/contexts/ProjectContext";
import SelectorItem from "@/components/selectorItem.tsx";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AppSidebar() {
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();
  const router = useRouter();
  const { projects, selectedProjectId, setSelectedProjectId, refreshProjects } =
    useProject();
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleLogout = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("http://localhost:8000/auth/logout", user, config)
      .then(() => {
        setToken(null);
        setUser(null);
        router.push("/");
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !user) return;

    try {
      await axios.post(
        "http://localhost:8000/project",
        {
          title: projectName,
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProjectName("");
      setOpen(false);
      refreshProjects?.(); // Refresh the projects list
    } catch (error: any) {
      console.error("Error creating project:", error);
      alert(error.response?.data?.error || "Failed to create project");
    }
  };

  return (
    <Sidebar className="w-64 h-screen">
      <SidebarHeader>
        <Select40 />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/dashboard"
                    className="flex items-center space-x-2 p-2 rounded-md"
                  >
                    <Gauge className="h-5 w-5" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/tasks"
                    className="flex items-center space-x-2 p-2 rounded-md"
                  >
                    <CheckSquare className="h-5 w-5" />
                    <span>Tasks</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/invitations"
                    className="flex items-center space-x-2 p-2 rounded-md"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Invitations</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {user?.isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="/admin"
                      className="flex items-center space-x-2 p-2 rounded-md"
                    >
                      <Users className="h-5 w-5" />
                      <span>User Management</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a
                href="/accountsettings"
                className="flex items-center space-x-2 p-2 rounded-md"
              >
                <Settings className="h-5 w-5" />
                <span>Account settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              onClick={handleLogout}
              className="hover:cursor-pointer hover:bg-red-500 hover:text-white"
            >
              <a className="flex items-center space-x-2 p-2 rounded-md">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Project</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input
                          id="projectName"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          placeholder="Enter project name"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Create Project
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
}
