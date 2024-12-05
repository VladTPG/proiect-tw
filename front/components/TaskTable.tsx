"use client";

import React, { useState } from "react";
import type { Task as TaskType } from "@/dummy-data/tasks";
import TaskCard from "./taskCard";
import { Checkbox } from "@/components/ui/checkbox";
import { useProject } from "@/contexts/ProjectContext";

interface TaskTableProps {
  tasks: TaskType[];
}

export function TaskTable({ tasks }: TaskTableProps) {
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());
  const { selectedProjectId } = useProject();

  // Filter tasks for the selected project
  const projectTasks = tasks.filter(
    (task) => task.projectFK === selectedProjectId
  );

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
    if (selectedTasks.size === projectTasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(projectTasks.map((task) => task.id)));
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
                checked={selectedTasks.size === projectTasks.length}
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
          {projectTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isSelected={selectedTasks.has(task.id)}
              onToggleSelect={() => toggleTask(task.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
