import {
  getAllTasks,
  getAllTasksFromProject,
  addTask,
  taskPriorities,
  taskStatus,
  findTaskByPk,
  updateTask,
  deleteTask,
} from "../../models/task/task.model.js";
import { checkIfProjectExists } from "../../models/project/project.model.js";
import { checkIfUserExists } from "../../models/user/user.model.js";

async function httpGetAllTasks(req, res) {
  return res.status(200).json(await getAllTasks());
}

async function httpGetAllTasksForProject(req, res) {
  const { id } = req.params;

  try {
    const tasks = await getAllTasksFromProject(id);
    if (!tasks) {
      return res.status(200).json({ tasks: [] });
    }
    return res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function httpAddTask(req, res) {
  const task = req.body.task;

  try {
    if (!task.userId) {
      return res.status(500).json({ error: "User Id is null!" });
    }

    if (!task.projectId) {
      return res.status(500).json({ error: "Project Id is null!" });
    }

    const project = checkIfProjectExists(task.projectId);
    if (!project) {
      return res
        .status(404)
        .json({ error: "Can't add task - Project doesn't exist!" });
    }

    if (!task.title || !task.title.length) {
      return res.status(404).json({ error: "Can't add task - Empty title!" });
    }

    if (!task.description || !task.description.length) {
      return res
        .status(404)
        .json({ error: "Can't add task - Empty description!" });
    }

    const deadline = new Date(task.deadline);
    if (deadline < Date.now()) {
      return res.status(500).json({ error: "Deadline can't be in the past!" });
    }

    if (!taskPriorities.includes(parseInt(task.priority))) {
      return res.status(500).json({ error: "Priority isn't defined!" });
    }

    if (!taskStatus.includes(task.status)) {
      return res.status(500).json({ error: "Status isn't defined!" });
    }

    const newTask = await addTask(task);
    return res.status(200).json({
      ok: 1,
      task: newTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function httpUpdateTask(req, res) {
  const { id } = req.params;
  const updates = req.body.task;

  try {
    // Validate task exists
    const existingTask = await findTaskByPk(id);
    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // For status updates, validate the new status
    if (updates.status && !taskStatus.includes(updates.status)) {
      return res.status(400).json({
        error: "Invalid status value",
        allowedValues: taskStatus,
      });
    }

    // For priority updates, validate the new priority
    if (
      updates.priority &&
      !taskPriorities.includes(parseInt(updates.priority))
    ) {
      return res.status(400).json({
        error: "Invalid priority value",
        allowedValues: taskPriorities,
      });
    }

    // For deadline updates, validate the date
    if (updates.deadline) {
      const newDeadline = new Date(updates.deadline);
      if (newDeadline < Date.now()) {
        return res
          .status(400)
          .json({ error: "Deadline cannot be in the past" });
      }
    }

    // Update the task
    await updateTask(updates);

    const updatedTask = await findTaskByPk(id);
    return res.status(200).json({
      ok: 1,
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function httpDeleteTask(req, res) {
  const taskId = req.params.id;
  console.log("Controller: Received delete request for task ID:", taskId);

  try {
    // First check if task exists
    console.log("Controller: Checking if task exists");
    const task = await findTaskByPk(taskId);
    console.log("Controller: Found task:", task);

    if (!task) {
      console.log("Controller: Task not found");
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Attempt to delete the task
    console.log("Controller: Attempting to delete task");
    const result = await deleteTask(taskId);
    console.log("Controller: Delete result:", result);

    if (result === 1) {
      // Sequelize returns 1 if deletion was successful
      console.log("Controller: Task deleted successfully");
      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } else {
      console.log("Controller: Failed to delete task");
      return res.status(400).json({
        success: false,
        message: "Failed to delete task",
      });
    }
  } catch (error) {
    console.error("Controller: Error deleting task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export {
  httpGetAllTasks,
  httpGetAllTasksForProject,
  httpAddTask,
  httpUpdateTask,
  httpDeleteTask,
};
