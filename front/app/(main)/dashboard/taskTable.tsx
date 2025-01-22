"use client";

import React, { useState, useEffect } from "react";
import TaskCard from "@/components/taskCard";
import { useProject } from "@/contexts/ProjectContext";
import { useToken } from "@/contexts/TokenContext";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { AddTaskModal } from "@/components/addTaskModal";
import { EditTaskModal } from "@/components/editTaskModal";

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

const statusLabels: { [key: string]: string } = {
  "Not Started": "Not Started",
  "In Progress": "In Progress",
  "Pending Review": "Pending Review",
  Completed: "Completed",
};

export const TaskTable = () => {
  const { selectedProjectId } = useProject();
  const { token } = useToken();
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [projectName, setProjectName] = useState("");
  const [open, setOpen] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState<
    () => void | undefined
  >(() => () => {});

  const fetchTasks = async () => {
    if (selectedProjectId && token) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/task/${selectedProjectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Fetched tasks response:", response.data); // Debug log

        if (response.data && response.data.tasks) {
          setTasks(response.data.tasks);
        } else {
          console.error("Unexpected response format:", response.data);
          setTasks([]);
        }
      } catch (error: any) {
        console.error("Error fetching tasks:", error);
        if (error.response?.status === 404) {
          setTasks([]);
        } else {
          console.error("Error details:", error.response?.data);
          setTasks([]);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetchUsers = async () => {
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:8000/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Log the response to see its structure
      console.log("Users response:", response.data);
      // Assuming the users are in a 'users' property of the response
      setUsers(response.data.users || []); // Changed from response.data to response.data.users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    console.log("Selected Project ID changed:", selectedProjectId); // Debug log
    fetchTasks();
  }, [selectedProjectId, token]);

  useEffect(() => {
    const checkProjectRole = async () => {
      if (!selectedProjectId || !token || !user) {
        setIsManager(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/project/${selectedProjectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Check if the current user is the project manager
        setIsManager(response.data.project.userId === user.id);
      } catch (error) {
        console.error("Error checking project role:", error);
        setIsManager(false);
      }
    };

    checkProjectRole();
  }, [selectedProjectId, token, user]);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const getUserName = (userId: number | null) => {
    if (!userId) return "Unassigned";
    const user = users.find((u) => u.id === userId);
    return user ? user.displayName : `User ${userId}`;
  };

  const handleDeleteTask = async (taskId: number) => {
    // Confirm deletion
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    // Check for token
    if (!token) {
      alert("You must be logged in to delete tasks");
      return;
    }

    try {
      // Make the delete request
      const response = await axios.delete(
        `http://localhost:8000/task/delete/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if deletion was successful
      if (response.data.success) {
        // Refresh the task list
        fetchTasks();
        // Notify user
        alert("Task deleted successfully");
      } else {
        throw new Error(response.data.message || "Failed to delete task");
      }
    } catch (error: any) {
      // Handle errors
      console.error("Error deleting task:", error);
      alert(error.response?.data?.message || "Failed to delete task");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !user) {
      console.error("No token or user available");
      return;
    }

    try {
      console.log(
        "Creating project with name:",
        projectName,
        "and userId:",
        user.id
      );
      const response = await axios.post(
        "http://localhost:8000/project",
        {
          name: projectName,
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Project creation response:", response.data);

      if (response.data.success) {
        setProjectName("");
        setOpen(false);
        setRefreshProjects(() => () => fetchTasks());
        alert("Project created successfully!");
      } else {
        throw new Error(response.data.error || "Failed to create project");
      }
    } catch (error: any) {
      console.error("Error creating project:", error);
      alert(error.response?.data?.error || "Failed to create project");
    }
  };

  if (!selectedProjectId) {
    return (
      <div className="flex justify-center items-center h-[200px] text-muted-foreground">
        Please select a project to view its tasks
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[200px] text-muted-foreground">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isManager && (
        <>
          <AddTaskModal
            projectId={selectedProjectId}
            onTaskAdded={fetchTasks}
          />
          <EditTaskModal
            task={editingTask}
            open={!!editingTask}
            onOpenChange={(open) => !open && setEditingTask(null)}
            onTaskUpdated={fetchTasks}
          />
        </>
      )}
      <div className="w-full border rounded-lg">
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
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="group border-b">
                  <TaskCard
                    task={task}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                    isManager={isManager}
                    currentUserId={user?.id || 0}
                    onTaskUpdated={fetchTasks}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-4 text-muted-foreground"
                >
                  No tasks found for this project.
                  <br />
                  <span className="text-sm">
                    Create a new task to get started!
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
