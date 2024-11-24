import tasks, {Task} from "@/dummy-data/tasks";
import TaskCard from "@/components/taskCard";
import React from "react";

export const TaskTable = () => {
    return (
        <table className="w-full table-auto border-collapse">
            <thead>
            <tr className="">
                <th className="p-2 text-left border-b">Title</th>
                <th className="p-2 text-left border-b">Description</th>
                <th className="p-2 text-left border-b">Deadline</th>
                <th className="p-2 text-left border-b">Status</th>
                <th className="p-2 text-left border-b">Priority</th>
                <th className="p-2 text-left border-b">Asignee</th>
            </tr>
            </thead>
            <tbody className={"border-b"}>
            {tasks.map((task: Task) => (
                <TaskCard key={task.id} task={task}></TaskCard>
            ))}
            </tbody>
        </table>
    )
}