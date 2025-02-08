import { Router } from "express";
import { authenticateJWT } from "../utils/auth.middleware.js";
import {
  getUsersController,
  deleteUserController,
} from "../controllers/user.controller.js";
import { authorizeRole } from "../utils/role.middleware.js";

const routerUsers = Router();

routerUsers.get(
  "/",
  authenticateJWT,
  authorizeRole("admin"),
  getUsersController
);
routerUsers.delete(
  "/:email",
  authenticateJWT,
  authorizeRole("admin"),
  deleteUserController
);

export default routerUsers;
