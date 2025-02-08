import { buildResponse } from "../utils/response.helper.js";
import {
  getUsersService,
  deleteUserService,
} from "../services/user.service.js";

export const getUsersController = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const users = await getUsersService({ page, limit, search });

    res
      .status(200)
      .json(buildResponse(200, "Usuarios consultados correctamente.", users));
  } catch (error) {
    res
      .status(400)
      .json(
        buildResponse(
          400,
          `Error al consultar los usuarios: ${error.message}`,
          null
        )
      );
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { email } = req.params;
    const response = await deleteUserService(email);
    res
      .status(200)
      .json(buildResponse(response.status, response.message, response.data));
  } catch (error) {
    res
      .status(400)
      .json(
        buildResponse(
          400,
          `Error al eliminar el usuario: ${error.message}`,
          null
        )
      );
  }
};
