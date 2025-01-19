import {
    getAllProjects,
    checkIfProjectExists,
    createProject,
    updateProject,
    deleteProject
} from '../../models/project/project.model.js';

import { checkIfUserExistsById } from "../../models/user/user.model.js";

async function httpGetAllProjects(req, res) {
    try {
        const projects = await getAllProjects();
        return res.status(200).json({ projects });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


async function httpGetProjectById(req, res) {
    const { id } = req.params;

    try {
        const project = await checkIfProjectExists(id);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        return res.status(200).json({ project });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function httpCreateProject(req, res) {
    const project = req.body;

    if (!project.title || !project.title.length) {
        return res.status(400).json({ error: "Project title is required" });
    }

    if (!project.userId) {
        return res.status(400).json({ error: "User ID is required to create a project" });
    }

    try {
        const userExists = await checkIfUserExistsById(project.userId);
        if (!userExists) {
            return res.status(404).json({ error: "User not found" });
        }

        const newProject = await createProject(project);
        return res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function httpUpdateProject(req, res) {
    const { id } = req.params;
    const projectUpdates = req.body;

    try {
        const existingProject = await checkIfProjectExists(id);
        if (!existingProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        if (projectUpdates.userId) {
            const userExists = await checkIfUserExistsById(projectUpdates.userId);
            if (!userExists) {
                return res.status(404).json({ error: "User not found" });
            }
        }

        await updateProject({ id: existingProject.id, ...projectUpdates });

        return res.status(200).json({ message: "Project updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


async function httpDeleteProject(req, res) {
    const { id } = req.params;

    try {
        const project = await checkIfProjectExists(id);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        await deleteProject(id);
        return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export {
    httpGetAllProjects,
    httpGetProjectById,
    httpCreateProject,
    httpUpdateProject,
    httpDeleteProject
};