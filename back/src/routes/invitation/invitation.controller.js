import {
    getAllInvitations,
    findInvitationByPk,
    getInvitationsByProject,
    getInvitationsByUser,
    addInvitation,
    updateInvitation,
    deleteInvitation
} from '../../models/invitation/invitation.model.js';

import { checkIfProjectExists } from '../../models/project/project.model.js';
import { checkIfUserExistsById } from '../../models/user/user.model.js';
import { getInvitationsByUserAndProject } from '../../models/invitation/invitation.model.js';

async function httpGetAllInvitations(req, res) {
    try {
        const invitations = await getAllInvitations();
        return res.status(200).json({ invitations });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function httpGetInvitationById(req, res) {
    const { id } = req.params;

    try {
        const invitation = await findInvitationByPk(id);
        if (!invitation) {
            return res.status(404).json({ error: "Invitation not found" });
        }
        return res.status(200).json({ invitation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function httpGetInvitationsByProject(req, res) {
    const { projectId } = req.params;

    try {
        const invitations = await getInvitationsByProject(projectId);
        if (!invitations.length) {
            return res.status(404).json({ error: "No invitations found for this project" });
        }
        return res.status(200).json({ invitations });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function httpGetInvitationsByUser(req, res) {
    const { userId } = req.params;

    try {
        const invitations = await getInvitationsByUser(userId);
        if (!invitations.length) {
            return res.status(404).json({ error: "No invitations found for this user" });
        }
        return res.status(200).json({ invitations });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function httpAddInvitation(req, res) {
    const invitation = req.body;

    if (!invitation.projectId || !invitation.userId || !invitation.status || !invitation.date) {
        return res.status(400).json({ error: "Missing required fields!" });
    }

    try {
        const projectExists = await checkIfProjectExists(invitation.projectId);
        if (!projectExists) {
            return res.status(404).json({ error: "Project not found" });
        }

        const userExists = await checkIfUserExistsById(invitation.userId);
        if (!userExists) {
            return res.status(404).json({ error: "User not found" });
        }

        const newInvitation = await addInvitation(invitation);
        return res.status(201).json({
            message: "Invitation created successfully",
            invitation: newInvitation
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function httpUpdateInvitation(req, res) {
    const { id } = req.params;
    const invitationUpdates = req.body;

    try {
        const existingInvitation = await findInvitationByPk(id);
        if (!existingInvitation) {
            return res.status(404).json({ error: "Invitation not found" });
        }

        if (invitationUpdates.projectId) {
            const projectExists = await checkIfProjectExists(invitationUpdates.projectId);
            if (!projectExists) {
                return res.status(404).json({ error: "Project not found" });
            }
        }

        if (invitationUpdates.userId) {
            const userExists = await checkIfUserExistsById(invitationUpdates.userId);
            if (!userExists) {
                return res.status(404).json({ error: "User not found" });
            }
        }

        await updateInvitation({ id, ...invitationUpdates });
        return res.status(200).json({ message: "Invitation updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


async function httpDeleteInvitation(req, res) {
    const { id } = req.params;

    try {
        const invitation = await findInvitationByPk(id);
        if (!invitation) {
            return res.status(404).json({ error: "Invitation not found" });
        }

        await deleteInvitation(id);
        return res.status(200).json({ message: "Invitation deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function httpGetInvitationsByUserAndProject(req, res) {
    const { userId, projectId } = req.params;

    try {
        const invitations = await getInvitationsByUserAndProject(userId, projectId);
        if (!invitations.length) {
            return res.status(404).json({ error: "No invitations found for this user and project" });
        }
        return res.status(200).json({ invitations });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export {
    httpGetAllInvitations,
    httpGetInvitationsByUserAndProject,
    httpGetInvitationById,
    httpGetInvitationsByProject,
    httpGetInvitationsByUser,
    httpAddInvitation,
    httpUpdateInvitation,
    httpDeleteInvitation
};