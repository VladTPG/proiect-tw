import express from "express";
import {
    httpGetAllUsers,
    httpAddUser,
    httpLogin,
    httpLogout,
    httpUpdateUser
} from "./auth.controller.js";
import {authenticate} from "../../middleware/jwtVerification.js";

const authRouter = express.Router();

authRouter.get('/', httpGetAllUsers);
authRouter.post('/', httpAddUser);
authRouter.post('/login', httpLogin);
authRouter.post('/logout', authenticate, httpLogout);
authRouter.put('/:id', authenticate, httpUpdateUser);

export default authRouter;