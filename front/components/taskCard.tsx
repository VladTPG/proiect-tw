"use client"
import type { Task as TaskType } from "@/dummy-data/tasks";
import users from "@/dummy-data/users";
import React from "react";
import { PriorityBadge } from "@/components/priorityBadge";

export default function TaskCard({ task }: { task: TaskType }) {
  return (
      <tr>
        <td className="p-2 border-r">{task.title}</td>
        <td className="p-2 border-r">{task.description}</td>
        <td className="p-2 border-r">{task.deadline.toLocaleString("en-US",{
          weekday:"long",
          year:"numeric",
          month:"long",
          day:"numeric",
          hour12:false
        })}</td>
        <td className="p-2 border-r">{task.status}</td>
        <td className="p-2 border-r">
          <PriorityBadge priority={task.priority} />
        </td>
        <td className="p-2 border-r">{task.userFK ? `${users.find(user => user.id === task.userFK)?.displayName}` : "None"}</td>
      </tr>
  );
}
