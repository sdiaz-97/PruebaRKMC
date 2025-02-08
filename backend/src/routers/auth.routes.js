import { Router } from "express";
import {
  postLoginController,
  postRegisterController,
} from "../controllers/auth.controller.js";

const routerLogin = Router();

routerLogin.post("/login", postLoginController);
routerLogin.post("/register", postRegisterController);

export default routerLogin;
