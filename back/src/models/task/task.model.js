import {Task} from '../index.js';
import connection from '../../services/mysql_connection.js';

const taskPriorities = [1, 2, 3, 4, 5];
const taskStatus = ['Completed', 'In Progress', 'Not Started', 'Pending Review'];

async function getAllTasks(ORM = true) {
    if (!ORM) {
        connection.query('SELECT * FROM TASKS', (err, results, fields) => {
            if (err) throw err;
            console.log(results.insertId);
        });
    }
    else {
        return await Task.findAll({});
    }
}

async function getAllTasksFromProject(id, ORM = true) {
    if (!ORM) {
        connection.query('SELECT * FROM TASKS WHERE id = ?', id, (err, results, fields) => {
            if (err) throw err;
            console.log(results.insertId);
        });
    }
    else {
        return await Task.findAll({
            where: {
                id: id
            }
        })
    }
}

async function addTask(task, ORM = true) {
    if (!ORM) {
        connection.query('INSERT INTO TASKS SET ?', task, (err, results, fields) => {
            if (err) throw err;
            console.log(results.insertId);
        });
    }
    else {
        return await Task.create(task);
    }
}

async function updateTask(task, ORM = true) {
    if (!ORM) {
        connection.query('UPDATE TASKS SET ? WHERE id = ?', task, task.id, (err, results, fields) => {
            if (err) throw err;
            console.log(results.insertId);
        });
    }
    else {
        return await Task.update(task, {
            where: { id: task.id }
        });
    }
}

async function deleteTask(id, ORM = true) {
    if (!ORM) {
        connection.query('DELETE FROM TASKS WHERE id = ?', id, (err, results, fields) => {
            if (err) throw err;
            console.log(results.insertId);
        });
    }
    else {
        return await Task.destroy({
            where: { id: id }
        });
    }
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