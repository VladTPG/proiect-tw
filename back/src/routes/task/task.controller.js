import {
    getAllTasks,
    getAllTasksFromProject,
    addTask,
    taskPriorities,
    taskStatus,
    findTaskByPk,
    updateTask,
    deleteTask
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
            return res.status(404).json({ error: "Can't add task - Project doesn't exist!" });
        }

        if (!task.title || !task.title.length) {
            return res.status(404).json({ error: "Can't add task - Empty title!" });
        }

        if (!task.description || !task.description.length) {
            return res.status(404).json({ error: "Can't add task - Empty description!" });
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

//TODO validare pt access manager proiect
async function httpUpdateTask(req, res) {
    const {id} = req.params;
    const task = req.body.task;
    console.log(id);
    try {
        let oldTask = await findTaskByPk(id);
        console.log(oldTask);
        oldTask = oldTask.dataValues;
        
        if (!oldTask) {
            return res.status(404).json({ error: "Can't update inexistent task!"});
        }

        if (id !== task.id) {
            return res.status(500).json({ error: "Invalid task!" });
        }

        if (!task.userId) {
            return res.status(500).json({ error: "User Id is null!" });
        }

        if (oldTask.userId != task.userId) {
            return res.status(403).json({ error: "User doesn't have the permission for this operation!"});
        }

        if (!task.projectId) {
            return res.status(500).json({ error: "Project Id is null!" });
        }

        const project = await checkIfProjectExists(task.projectId);
        if (!project) {
            return res.status(404).json({ error: "Can't add task - Project doesn't exist!" });
        }

        if (!task.title || !task.title.length) {
            return res.status(404).json({ error: "Can't update task - Empty title!" });
        }

        if (!task.description || !task.description.length) {
            return res.status(404).json({ error: "Can't update task - Empty description!" });
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

        const updatedTask = await updateTask(task);
        return res.status(200).json({
            ok: 1
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function httpDeleteTask(req, res) {
    const { id } = req.params;
    const user = req.body.user;

    try {
        const fullUser = await checkIfUserExists(user.email);
        if (!fullUser) {
            return res.status(404).json({ error: "Can't delete task - User doesn't exist!" });
        }
        
        const task = await findTaskByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Can't delete inexistent task!"});
        }

        if (fullUser.id !== task.userId) {
            return res.status(403).json({ error: "User doesn't have the permission for this operation!"});
        }

        const noRowsDeleted = await deleteTask(id);
        if (noRowsDeleted === 0) {
            return res.status(400).json({ error: "Something went wrong!"});
        }
        else {
            return res.status(200).json({ ok: 1 });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export {
    httpGetAllTasks,
    httpGetAllTasksForProject,
    httpAddTask,
    httpUpdateTask,
    httpDeleteTask
}