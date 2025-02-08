import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

export const postLoginService = async (email, password) => {
  try {
    let response = {};
    const login = await prisma.krUser.findUnique({
      where: {
        email: email,
      },
    });

    if (login) {
      const isPasswordValid = await bcrypt.compare(password, login.password);
      if (!isPasswordValid) {
        response.status = 401;
        response.message = "Usuario y/o contraseña incorrectos";
        return response;
      }
      const role = login.roleId === 1 ? "admin" : "user";
      const token = jwt.sign({ email, role }, "KRMCTEST");
      response.status = 200;
      response.data = { tokenjwt: token, userData: login };
      response.message = "Inicio correctamente sesión";
    } else {
      response.status = 401;
      response.message = "Usuario y/o contraseña erroneos";
    }
    return response;
  } catch (error) {
    throw new Error(`Error al iniciar sesón: ${error.message}`);
  }
};

export const postRegisterService = async (user) => {
  try {
    let response = {};
    const userExist = await prisma.krUser.findUnique({
      where: { email: user.email },
    });
    if (!userExist) {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      await prisma.krUser.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          roleId: user.roleId,
          entryDate: user.entryDate,
          salary: user.salary,
          isActive: true,
        },
      });

      response.status = 200;
      response.message = "Usuario creado correctamente";
    } else {
      response.status = 401;
      response.message = "Ya existe un usuario con ese correo";
    }
    return response;
  } catch (error) {
    throw new Error(`Error al registrar usuario: ${error.message}`);
  }
};
