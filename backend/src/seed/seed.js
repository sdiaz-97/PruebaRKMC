import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {

  await prisma.krRole.createMany({
    data: [
      { id: 1, name: "Administrador" },
      { id: 2, name: "Empleado" },
    ],
    skipDuplicates: true,
  });

  console.log("Roles iniciales insertados correctamente.");

  const userExist = await prisma.krUser.findUnique({
    where: { email: "admin@hotmail.com" },
  });

  if (!userExist) {
    const hashedPassword = await bcrypt.hash("admin", saltRounds);
    await prisma.krUser.create({
      data: {
        name: "Administrador",
        email: "admin@hotmail.com",
        password: hashedPassword,
        roleId: 1,
        entryDate: new Date(),
        salary: 5000,
        isActive: true,
      },
    });

    console.log("Usuario administrador creado correctamente.");
  } else {
    console.log("El usuario administrador ya existe.");
  }
}

main()
  .catch((e) => {
    console.error("Error en la inserción de datos:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
