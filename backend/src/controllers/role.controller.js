import { buildResponse } from "../utils/response.helper.js";
import { getRolesService } from "../services/role.service.js";

export const getRoleController = async (req, res) => {
  try {
    const roles = await getRolesService();
    res.status(200).json(buildResponse(200, "Roles consultados.", roles));
  } catch (error) {
    res
      .status(400)
      .json(
        buildResponse <
          null >
          (400, `Error al consultar los roles: ${error.message}`, null)
      );
  }
};
