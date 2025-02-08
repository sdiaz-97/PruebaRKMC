import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsersService = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {
  try {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    const whereCondition = {
      isActive: true,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    };

    const users = await prisma.krUser.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        salary: true,
        entryDate: true,
        role: { select: { id: true, name: true } },
      },
      where: whereCondition,
      skip,
      take: pageSize,
    });

    const totalUsers = await prisma.krUser.count({ where: whereCondition });

    return {
      total: totalUsers,
      page: pageNumber,
      limit: pageSize,
      users,
    };
  } catch (error) {
    throw new Error(`Error al obtener los usuarios: ${error.message}`);
  }
};

export const deleteUserService = async (email) => {
  try {
    let response = {};
    const userExists = await prisma.krUser.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists && email != "admin@hotmail.com") {
      const deleteUser = await prisma.krUser.update({
        where: {
          email: email,
        },
        data: {
          isActive: false,
        },
      });
      response.status = 200;
      response.message = "Usuario eliminado correctamente";
      return response;
    } else {
      response.status = 401;
      response.message = "No se puede eliminar el usuario";
      return response;
    }
  } catch (error) {
    throw new Error(`Error al eliminar el usuario: ${error.message}`);
  }
};
