import { Task } from '../index.js';

const taskPriorities = [1, 2, 3, 4, 5];
const taskStatus = ['Completed', 'In Progress', 'Not Started', 'Pending Review'];

async function getAllTasks() {
    return await Task.findAll({});
}

async function getAllTasksFromProject(id) {
    return await Task.findAll({
        where: {
            id: id
        }
    });
}

async function addTask(task) {
    return await Task.create(task);
}

async function updateTask(task) {
    return await Task.update(task, {
        where: { id: task.id }
    });
}

async function deleteTask(id) {
    return await Task.destroy({
        where: { id: id }
    });
}

async function findTaskByPk(taskId) {
    return await Task.findByPk(taskId);
}

export {
    getAllTasks,
    getAllTasksFromProject,
    addTask,
    taskPriorities,
    taskStatus,
    findTaskByPk,
    updateTask,
    deleteTask
}