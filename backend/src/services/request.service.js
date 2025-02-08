import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRequestsService = async ({
  page = 1,
  limit = 10,
  search = "",
  userData,
}) => {
  try {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    const whereCondition = {
      OR: [
        { code: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { resume: { contains: search, mode: "insensitive" } },
      ],
    };

    if (userData.role !== "admin") {
      whereCondition.AND = [{ employee: { email: userData.email } }];
    }

    const requests = await prisma.krRequest.findMany({
      select: {
        id: true,
        employeeId: true,
        code: true,
        description: true,
        resume: true,
        createdAt: true,
        employee: {
          select: {
            email: true,
          },
        },
      },
      where: whereCondition,
      skip,
      take: pageSize,
    });

    const totalRequests = await prisma.krRequest.count({
      where: whereCondition,
    });

    return {
      total: totalRequests,
      page: pageNumber,
      limit: pageSize,
      requests,
    };
  } catch (error) {
    throw new Error(`Error al obtener las solicitudes: ${error.message}`);
  }
};

export const deleteRequestService = async (id) => {
  try {
    const requestExists = await prisma.krRequest.findUnique({
      where: {
        id: id,
      },
    });
    if (requestExists) {
      const deleteRequest = await prisma.krRequest.delete({
        where: {
          id: id,
        },
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(`Error al eliminar la solicitud: ${error.message}`);
  }
};

export const postRequestService = async (request) => {
  try {
    let response = {};
    const newRequest = await prisma.krRequest.create({
      data: {
        ...request,
        isActive: true,
      },
    });
    response.status = 200;
    response.message = "Solicitud creada correctamente";
    return response;
  } catch (error) {
    throw new Error(`Error al crear la solicitud: ${error.message}`);
  }
};
