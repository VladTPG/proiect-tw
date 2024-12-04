import {Task} from '../index.js';
import connection from '../../services/mysql_connection.js';

const taskPriorities = [1, 2, 3, 4, 5];
const taskStatus = ['Completed', 'In Progress', 'Not Started', 'Pending'];

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


export {
    getAllTasks,
    getAllTasksFromProject,
    addTask,
    taskPriorities,
    taskStatus,
}