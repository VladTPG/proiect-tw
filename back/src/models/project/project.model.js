import { Project } from "../index.js";

async function checkIfProjectExists(id) {
  return await Project.findByPk(id);
}

async function createProject(project) {
  console.log("Model: Creating project with data:", project);
  try {
    const newProject = await Project.create({
      title: project.title,
      userId: project.userId,
    });
    console.log("Model: Project created:", newProject);
    return newProject;
  } catch (error) {
    console.error("Model: Error creating project:", error);
    throw error;
  }
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
    where: { id: id },
  });
}

async function findProjectByTitle(title) {
  return await Project.findOne({
    where: { title: title },
  });
}

export {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  findProjectByTitle,
  checkIfProjectExists,
};
