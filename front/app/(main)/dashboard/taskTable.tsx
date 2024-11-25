"use client";

import tasks, { Task } from "@/dummy-data/tasks";
import TaskCard from "@/components/taskCard";
import React from "react";
import { useProject } from "@/contexts/ProjectContext";

export const TaskTable = () => {
  const { selectedProjectId } = useProject();

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
    <table className="w-full">
      <thead>
        <tr>
          <th className="p-2 text-left border-b">Title</th>
          <th className="p-2 text-left border-b">Description</th>
          <th className="p-2 text-left border-b">Deadline</th>
          <th className="p-2 text-left border-b">Status</th>
          <th className="p-2 text-left border-b">Priority</th>
          <th className="p-2 text-left border-b">Asignee</th>
        </tr>
      </thead>
      <tbody className={"border-b"}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: Task) => (
            <TaskCard key={task.id} task={task}></TaskCard>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="text-center p-4 text-muted-foreground">
              No tasks found for this project
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
