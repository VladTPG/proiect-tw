"use client";

import tasks, { Task } from "@/dummy-data/tasks";
import TaskCard from "@/components/taskCard";
import React, { useState } from "react";
import { useProject } from "@/contexts/ProjectContext";

export const TaskTable = () => {
  const { selectedProjectId } = useProject();
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());

  const toggleTask = (taskId: number) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
  };

  if (!selectedProjectId) {
    return (
      <div className="flex justify-center items-center h-[200px] text-muted-foreground">
        Please select a project to view its tasks
      </div>
    );
  }

  const filteredTasks = tasks.filter(
    (task) => task.projectFK === selectedProjectId
  );

  return (
    <div className="space-y-1">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task: Task) => (
          <TaskCard
            key={task.id}
            task={task}
            isSelected={selectedTasks.has(task.id)}
            onToggleSelect={() => toggleTask(task.id)}
          />
        ))
      ) : (
        <div className="text-center p-4 text-muted-foreground">
          No tasks found for this project
        </div>
      )}
    </div>
  );
};
