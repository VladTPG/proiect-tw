import { Task } from "../index.js";

const taskPriorities = [1, 2, 3, 4, 5];
const taskStatus = [
  "Completed",
  "In Progress",
  "Not Started",
  "Pending Review",
];

async function getAllTasks() {
  return await Task.findAll({});
}

async function getAllTasksFromProject(id) {
  return await Task.findAll({
    where: {
      projectId: id,
    },
  });
}

async function addTask(task) {
  return await Task.create(task);
}

async function updateTask(task) {
  try {
    console.log("Model 1. Starting update with data:", task);

    // Validate input
    if (!task.id) {
      throw new Error("Task ID is required for update");
    }

    const updateData = {
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      status: task.status,
      priority: task.priority,
      userId: task.userId,
      projectId: task.projectId,
    };

    console.log("Model 2. Update data prepared:", updateData);

    const [updatedRows] = await Task.update(updateData, {
      where: { id: task.id },
      returning: true,
    });

    console.log("Model 3. Rows updated:", updatedRows);

    const updatedTask = await Task.findByPk(task.id);
    console.log("Model 4. Updated task:", updatedTask);

    if (!updatedTask) {
      throw new Error("Failed to retrieve updated task");
    }

    return updatedTask;
  } catch (error) {
    console.error("Model Error in updateTask:", error);
    console.error("Model Error stack:", error.stack);
    throw error; // Re-throw the error to be handled by the controller
  }
}

async function deleteTask(id) {
  console.log("Model: Attempting to delete task with ID:", id);
  try {
    const result = await Task.destroy({
      where: { id: id },
    });
    console.log("Model: Delete result:", result);
    return result;
  } catch (error) {
    console.error("Model: Error deleting task:", error);
    throw error;
  }
}

async function findTaskByPk(taskId) {
  console.log("Model: Looking for task with ID:", taskId);
  const task = await Task.findByPk(taskId);
  console.log("Model: Found task:", task);
  return task;
}

export {
  getAllTasks,
  getAllTasksFromProject,
  addTask,
  taskPriorities,
  taskStatus,
  findTaskByPk,
  updateTask,
  deleteTask,
};
