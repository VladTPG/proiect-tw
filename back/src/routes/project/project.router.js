import express from "express";
import {
    httpGetAllProjects,
    httpGetProjectById,
    httpCreateProject,
    httpUpdateProject,
    httpDeleteProject
} from './project.controller.js';

import { authenticate } from "../../middleware/jwtVerification.js";

const projectRouter= express.Router();

projectRouter.get('/', authenticate, httpGetAllProjects);
projectRouter.get('/:id', authenticate, httpGetProjectById);
projectRouter.post('/', authenticate, httpCreateProject);
projectRouter.put('/:id', authenticate, httpUpdateProject);
projectRouter.delete('/:id', authenticate, httpDeleteProject);

export default projectRouter;