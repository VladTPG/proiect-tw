import express from "express";
import {
    httpGetAllTasks,
    httpGetAllTasksForProject,
    httpAddTask
} from './task.controller.js';


const taskRouter = express.Router();

taskRouter.get('/', httpGetAllTasks);
taskRouter.get('/:id', httpGetAllTasksForProject);
taskRouter.post('/', httpAddTask);

export default taskRouter;