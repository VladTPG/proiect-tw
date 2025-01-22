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
  const task = req.body.task;

  try {
    console.log("1. Starting update process for task:", id);
    console.log("2. Received task data:", task);

    const existingTask = await findTaskByPk(id);
    console.log("3. Found existing task:", existingTask);

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (!task || typeof task !== "object") {
      return res.status(400).json({ error: "Invalid task data" });
    }

    if (!task.title?.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!task.description?.trim()) {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!task.deadline) {
      return res.status(400).json({ error: "Deadline is required" });
    }

    const deadline = new Date(task.deadline);
    if (isNaN(deadline.getTime())) {
      return res.status(400).json({ error: "Invalid deadline date" });
    }

    if (deadline < new Date()) {
      return res.status(400).json({ error: "Deadline can't be in the past" });
    }

    const priority = parseInt(task.priority);
    if (!taskPriorities.includes(priority)) {
      return res.status(400).json({ error: "Invalid priority value" });
    }

    if (!taskStatus.includes(task.status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    let userId = existingTask.userId;
    if (task.userId !== undefined) {
      userId = task.userId ? parseInt(task.userId) : null;
      console.log("4. Processed userId:", userId, "from input:", task.userId);
    }

    const taskToUpdate = {
      id: parseInt(id),
      title: task.title.trim(),
      description: task.description.trim(),
      deadline: deadline,
      status: task.status,
      priority: priority,
      userId: userId,
      projectId: existingTask.projectId,
    };

    console.log("5. Prepared update data:", taskToUpdate);

    try {
      const updatedTask = await updateTask(taskToUpdate);
      console.log("6. Update operation result:", updatedTask);

      if (!updatedTask) {
        console.error("7. Update failed - no task returned");
        return res.status(500).json({ error: "Failed to update task" });
      }

      return res.status(200).json({
        ok: true,
        task: updatedTask,
      });
    } catch (updateError) {
      console.error("8. Error during update operation:", updateError);
      throw updateError; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error("9. Error in httpUpdateTask:", error);
    console.error("Error stack:", error.stack);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
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
