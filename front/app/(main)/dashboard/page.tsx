"use client";

import { TaskTable } from "@/components/TaskTable";
import tasks from "@/dummy-data/tasks";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <TaskTable tasks={tasks} />
    </div>
  );
}
