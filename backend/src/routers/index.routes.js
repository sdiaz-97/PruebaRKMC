import { Router } from "express";
import routerUsers from "./user.routes.js";
import routerLogin from "./auth.routes.js";
import routerRoles from "./roles.routes.js";
import routerRequests from "./request.routes.js"

const router = Router();

router.use("/users", routerUsers);
router.use("/", routerLogin);
router.use("/roles", routerRoles);
router.use("/requests", routerRequests);

export default router;
