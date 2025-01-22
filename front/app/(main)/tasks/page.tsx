/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useToken } from "@/contexts/TokenContext";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import TaskCard from "@/components/taskCard";
import { EditTaskModal } from "@/components/editTaskModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/types/task";
import User from "@/types/user";
import { Project } from "@/types/project";

export default function TaskHistory() {
  const { token } = useToken();
  const { user } = useUser();
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [managedProjects, setManagedProjects] = useState<Project[]>([]);
  const [projectTasks, setProjectTasks] = useState<{ [key: number]: Task[] }>(
    {}
  );
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [userFilters, setUserFilters] = useState<{
    [key: number]: number | "all";
  }>({});

  // Fetch all projects the user manages
  const fetchManagedProjects = useCallback(async () => {
    if (!token || !user) return [];
    try {
      const response = await axios.get("http://localhost:8000/project", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check if response.data.projects exists and is an array
      const projects = response.data.projects || [];
      const userProjects = projects.filter(
        (project: Project) => project.userId === user.id
      );
      setManagedProjects(userProjects);
      return userProjects;
    } catch (error) {
      console.error("Error fetching managed projects:", error);
      setManagedProjects([]); // Set empty array on error
      return [];
    }
  }, [token, user]);

  // Fetch tasks for a specific project
  const fetchProjectTasks = useCallback(
    async (projectId: number) => {
      if (!token) return [];
      try {
        const response = await axios.get(
          `http://localhost:8000/task/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data.tasks || [];
      } catch (error) {
        console.error(`Error fetching tasks for project ${projectId}:`, error);
        return [];
      }
    },
    [token]
  );

  // Fetch all tasks assigned to the user
  const fetchAssignedTasks = useCallback(async () => {
    if (!token || !user) return;
    try {
      const response = await axios.get("http://localhost:8000/task", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userTasks = response.data.filter(
        (task: Task) => task.userId === user.id
      );
      setAssignedTasks(userTasks);
    } catch (error) {
      console.error("Error fetching assigned tasks:", error);
    }
  }, [token, user]);

  // Handle task deletion
  const handleDeleteTask = async (taskId: number) => {
    if (!token) return;
    try {
      await axios.delete(`http://localhost:8000/task/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Add function to fetch users
  const fetchUsers = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get("http://localhost:8000/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [token]);

  // Update useEffect to fetch users
  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token, fetchUsers]);

  // Function to handle user filter change
  const handleUserFilterChange = (projectId: number, userId: string) => {
    setUserFilters((prev) => ({
      ...prev,
      [projectId]: userId === "all" ? "all" : Number(userId),
    }));
  };

  // Function to filter tasks by user
  const getFilteredTasks = (projectId: number) => {
    const tasks = projectTasks[projectId] || [];
    const userFilter = userFilters[projectId];

    if (!userFilter || userFilter === "all") {
      return tasks;
    }

    return tasks.filter((task) => task.userId === userFilter);
  };

  // Add useCallback for refreshTasks
  const refreshTasks = useCallback(async () => {
    if (!token || !user) return;

    setIsLoading(true);
    try {
      await fetchAssignedTasks();
      const projects = await fetchManagedProjects();
      const tasksMap: { [key: number]: Task[] } = {};

      for (const project of projects) {
        tasksMap[project.id] = await fetchProjectTasks(project.id);
      }

      setProjectTasks(tasksMap);
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    token,
    user,
    fetchAssignedTasks,
    fetchManagedProjects,
    fetchProjectTasks,
  ]);

  useEffect(() => {
    if (token && user) {
      refreshTasks();
    }
  }, [token, user, refreshTasks]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Your Tasks Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <div className="border rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Task</th>
                <th className="text-left p-4 font-medium">Description</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Project</th>
                <th className="text-left p-4 font-medium">Due Date</th>
                <th className="w-[40px] p-4"></th>
              </tr>
            </thead>
            <tbody>
              {assignedTasks.length > 0 ? (
                assignedTasks.map((task) => (
                  <tr key={task.id} className="group border-b">
                    <TaskCard
                      task={task}
                      onEdit={setEditingTask}
                      onDelete={handleDeleteTask}
                      isManager={false}
                      currentUserId={user?.id || 0}
                      onTaskUpdated={refreshTasks}
                    />
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center p-4 text-muted-foreground"
                  >
                    No tasks assigned to you.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Projects You Manage Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Projects You Manage</h2>
        {managedProjects.length > 0 ? (
          managedProjects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Filter by user:
                  </span>
                  <Select
                    value={userFilters[project.id]?.toString() || "all"}
                    onValueChange={(value) =>
                      handleUserFilterChange(project.id, value)
                    }
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue>
                        {userFilters[project.id] === "all"
                          ? "All Users"
                          : users.find((u) => u.id === userFilters[project.id])
                              ?.displayName || "Select user"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="border rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Task</th>
                      <th className="text-left p-4 font-medium">Description</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Assignee</th>
                      <th className="text-left p-4 font-medium">Due Date</th>
                      <th className="w-[40px] p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredTasks(project.id).length > 0 ? (
                      getFilteredTasks(project.id).map((task) => (
                        <tr key={task.id} className="group border-b">
                          <TaskCard
                            task={task}
                            onEdit={setEditingTask}
                            onDelete={handleDeleteTask}
                            isManager={true}
                            currentUserId={user?.id || 0}
                            onTaskUpdated={refreshTasks}
                          />
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center p-4 text-muted-foreground"
                        >
                          No tasks found for the selected filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-muted-foreground border rounded-lg">
            You don&apos;t manage any projects.
          </div>
        )}
      </section>

      {/* Edit Task Modal */}
      <EditTaskModal
        task={editingTask}
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
        onTaskUpdated={refreshTasks}
      />
    </div>
  );
}
