import express from "express";
import {
    httpGetAllInvitations,
    httpGetInvitationById,
    httpGetInvitationsByProject,
    httpGetInvitationsByUser,
    httpAddInvitation,
    httpUpdateInvitation,
    httpDeleteInvitation,
    httpGetInvitationsByUserAndProject,
} from './invitation.controller.js';

import { authenticate } from "../../middleware/jwtVerification.js";

const invitationRouter = express.Router();

invitationRouter.get('/', authenticate, httpGetAllInvitations);
invitationRouter.get('/:id', authenticate, httpGetInvitationById);
invitationRouter.get('/project/:projectId', authenticate, httpGetInvitationsByProject);
invitationRouter.get('/user/:userId', authenticate, httpGetInvitationsByUser);
invitationRouter.post('/', authenticate, httpAddInvitation);
invitationRouter.put('/:id', authenticate, httpUpdateInvitation);
invitationRouter.delete('/:id', authenticate, httpDeleteInvitation);
invitationRouter.get('/user/:userId/project/:projectId', authenticate, httpGetInvitationsByUserAndProject);

export default invitationRouter;