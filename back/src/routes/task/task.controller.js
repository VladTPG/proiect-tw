import {
    getAllTasks,
    getAllTasksFromProject,
    addTask,
    taskPriorities,
    taskStatus
} from '../../models/task/task.model.js';
import {
    checkIfProjectExists
} from '../../models/project/project.model.js';
import {
    checkIfUserExists
} from '../../models/user/user.model.js';

async function httpGetAllTasks(req, res) {
    return res.status(200).json(await getAllTasks());
}

async function httpGetAllTasksForProject(req, res) {
    const { id } = req.params;

    try {
        const tasks = await getAllTasksFromProject(id);

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ error: "Project doesn't have any tasks!" });
        }

        return res.status(200).json({ tasks });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function httpAddTask(req, res) {
    const task = req.task;
    console.log(task);
    
    try {
        if (!task.userId) {
            return res.status(500).json({ error: "User Id is null!" });
        }

        if (!task.projectId) {
            return res.status(500).json({ error: "Project Id is null!" });
        }

        if (!checkIfProjectExists(task.projectId)) {
            return res.status(404).json({ error: "Can't add task - Project doesn't exist!" })
        }

        if (!checkIfUserExists(task.userId)) {
            return res.status(404).json({ error: "Can't add task - Assigned user doesn't exist!" })
        }

        if (user.title && !user.title.length) {
            return res.status(404).json({ error: "Can't add task - Empty title!" })
        }

        if (!user.description || !user.description.length) {
            return res.status(404).json({ error: "Can't add task - Empty description!" })
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
            task: newTask
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export {
    httpGetAllTasks,
    httpGetAllTasksForProject,
    httpAddTask
}