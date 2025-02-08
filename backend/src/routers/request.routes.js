import { Router } from "express";
import { authenticateJWT } from "../utils/auth.middleware.js";
import {
  getRequestsController,
  deleteRequestsController,
  postRequestsController,
} from "../controllers/request.controller.js";
import { authorizeRole } from "../utils/role.middleware.js";

const routerRequests = Router();

routerRequests.get(
  "/",
  authenticateJWT,
  authorizeRole("admin", "user"),
  getRequestsController
);
routerRequests.delete(
  "/:id",
  authenticateJWT,
  authorizeRole("admin"),
  deleteRequestsController
);

routerRequests.post(
  "/",
  authenticateJWT,
  authorizeRole("admin", "user"),
  postRequestsController
);

export default routerRequests;
