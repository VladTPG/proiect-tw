import express from "express";
import {
    httpGetAllTasks,
    httpGetAllTasksForProject,
    httpAddTask,
    httpUpdateTask,
    httpDeleteTask
} from './task.controller.js';
import { authenticate } from "../../middleware/jwtVerification.js";


const taskRouter = express.Router();

taskRouter.get('/', authenticate, httpGetAllTasks);
taskRouter.get('/:id', authenticate, httpGetAllTasksForProject);
taskRouter.post('/', authenticate, httpAddTask);
taskRouter.put('/update/:id', authenticate, httpUpdateTask);
taskRouter.delete('/delete/:id', authenticate, httpDeleteTask);

export default taskRouter;