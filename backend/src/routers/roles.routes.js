import { Router } from 'express';
import { getRoleController } from '../controllers/role.controller.js';

const routerRoles = Router();

routerRoles.get('/',  getRoleController);

export default routerRoles;
