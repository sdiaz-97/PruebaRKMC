import { buildResponse } from "../utils/response.helper.js";
import {
  postLoginService,
  postRegisterService,
} from "../services/auth.service.js";

export const postLoginController = async (req, res) => {
  const { email, password } = req.body;
  const response = await postLoginService(email, password);
  res
    .status(200)
    .json(buildResponse(response.status, response.message, response.data));
};

export const postRegisterController = async (req, res) => {
  const response = await postRegisterService(req.body);
  res
    .status(200)
    .json(buildResponse(response.status, response.message, response.data));
};
