import { buildResponse } from "../utils/response.helper.js";
import {
  getRequestsService,
  deleteRequestService,
  postRequestService,
} from "../services/request.service.js";

export const getRequestsController = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const userData = req.user;
    const requests = await getRequestsService({
      page,
      limit,
      search,
      userData,
    });

    res
      .status(200)
      .json(
        buildResponse(200, "Solicitudes consultadas correctamente.", requests)
      );
  } catch (error) {
    res
      .status(400)
      .json(
        buildResponse(
          400,
          `Error al consultar las solicitudes: ${error.message}`,
          null
        )
      );
  }
};

export const deleteRequestsController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteRequestService(parseInt(id));
    res
      .status(200)
      .json(buildResponse(200, "Usuario eliminado correctamente.", []));
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

export const postRequestsController = async (req, res) => {
  try {
    const data = req.body;
    const response = await postRequestService(data);
    res
      .status(200)
      .json(buildResponse(response.status, response.message, response.data));
  } catch (error) {
    res
      .status(400)
      .json(
        buildResponse(
          400,
          `Error al crear la solicitud: ${error.message}`,
          null
        )
      );
  }
};
