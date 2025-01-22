"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "@/contexts/TokenContext";
import TaskCard from "./taskCard";
import { Checkbox } from "@/components/ui/checkbox";
import { useProject } from "@/contexts/ProjectContext";

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

export function TaskTable() {
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());
  const [tasks, setTasks] = useState<Task[]>([]);
  const { selectedProjectId } = useProject();
  const { token } = useToken();

  useEffect(() => {
    if (selectedProjectId && token) {
      axios
        .get(`http://localhost:8000/task/${selectedProjectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTasks(response.data.tasks || []);
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    }
  }, [selectedProjectId, token]);

  const toggleTask = (taskId: number) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
  };

  const toggleAll = () => {
    if (selectedTasks.size === tasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(tasks.map((task) => task.id)));
    }
  };

  if (!selectedProjectId) {
    return (
      <div className="w-full border rounded-lg p-8 text-center text-muted-foreground">
        Please select a project to view its tasks
      </div>
    );
  }

  return (
    <div className="w-full border rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="w-[40px] p-4">
              <Checkbox
                checked={selectedTasks.size === tasks.length}
                onCheckedChange={toggleAll}
              />
            </th>
            <th className="text-left p-4 font-medium">Task</th>
            <th className="text-left p-4 font-medium">Description</th>
            <th className="text-left p-4 font-medium">Status</th>
            <th className="text-left p-4 font-medium">Assignee</th>
            <th className="text-left p-4 font-medium">Due Date</th>
            <th className="w-[40px] p-4"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isSelected={selectedTasks.has(task.id)}
              onToggleSelect={() => toggleTask(task.id)}
              onEdit={() => {}}
              onDelete={() => {}}
              isManager={false}
              currentUserId={0}
              onTaskUpdated={() => {}}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
