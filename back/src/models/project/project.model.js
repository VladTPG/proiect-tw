import {Project} from '../index.js'

async function checkIfProjectExists(id) {
    return await Project.findByPk(id);
}

async function createProject(project) {
    return await Project.create({
        title: project.title,
        userId: project.userId  
    });
}
async function getAllProjects() {
    return await Project.findAll({});
}

async function updateProject(project) {
    return await Project.update(
        { title: project.title, userId: project.userId },
        { where: { id: project.id } }
    );
}
async function deleteProject(id) {
    return await Project.destroy({
        where: { id: id }
    });
}

async function findProjectByTitle(title) {
    return await Project.findOne({
        where: { title: title }
    });
}
export {
 
    createProject,
    getAllProjects,
    updateProject,
    deleteProject,
    findProjectByTitle,
    checkIfProjectExists
}