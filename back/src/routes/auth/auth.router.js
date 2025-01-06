import express from "express";
import {
  httpGetAllUsers,
  httpAddUser,
  httpLogin,
  httpLogout,
  httpUpdateUser,
  httpDeleteUser,
} from "./auth.controller.js";
import { authenticate } from "../../middleware/jwtVerification.js";

const authRouter = express.Router();

authRouter.get("/", authenticate, httpGetAllUsers);
authRouter.post("/", httpAddUser);
authRouter.post("/login", httpLogin);
authRouter.post("/logout", authenticate, httpLogout);
authRouter.put("/:id", authenticate, httpUpdateUser);
authRouter.delete("/:id", authenticate, httpDeleteUser);

export default authRouter;
