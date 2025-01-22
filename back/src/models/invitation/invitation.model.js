import { Invitation, Project, User } from "../index.js";

async function addInvitation(invitation) {
  return await Invitation.create({
    projectId: invitation.projectId,
    userId: invitation.userId,
    status: invitation.status,
    date: invitation.date,
  });
}

async function getAllInvitations() {
  return await Invitation.findAll({
    include: [
      { model: Project, as: "project" },
      { model: User, as: "user" },
    ],
  });
}

async function findInvitationByPk(id) {
  return await Invitation.findByPk(id, {
    include: [
      { model: Project, as: "project" },
      { model: User, as: "user" },
    ],
  });
}

async function getInvitationsByProject(projectId) {
  return await Invitation.findAll({
    where: { projectId: projectId },
    include: [{ model: User, as: "user" }],
  });
}

// Găsește toate invitațiile pentru un anumit utilizator
async function getInvitationsByUser(userId) {
  return await Invitation.findAll({
    where: { userId: userId },
    include: [{ model: Project, as: "project" }],
  });
}

// Actualizează statusul unei invitații existente după ID
async function updateInvitation(invitation) {
  return await Invitation.update(
    {
      projectId: invitation.projectId,
      userId: invitation.userId,
      status: invitation.status,
      date: invitation.date,
    },
    {
      where: { id: invitation.id },
    }
  );
}

async function deleteInvitation(id) {
  return await Invitation.destroy({
    where: { id: id },
  });
}

async function getInvitationsByUserAndProject(userId, projectId) {
  return await Invitation.findAll({
    where: {
      userId: userId,
      projectId: projectId,
    },
    include: [
      { model: Project, as: "project" },
      { model: User, as: "user" },
    ],
  });
}

export {
  addInvitation,
  getAllInvitations,
  findInvitationByPk,
  getInvitationsByProject,
  getInvitationsByUser,
  updateInvitation,
  deleteInvitation,
  getInvitationsByUserAndProject,
};
