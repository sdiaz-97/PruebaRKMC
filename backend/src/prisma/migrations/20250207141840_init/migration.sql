/*
  Warnings:

  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Request";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "KrRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "KrRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KrUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "KrUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KrEmployee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "KrEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KrRequest" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KrRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KrRole_name_key" ON "KrRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "KrUser_email_key" ON "KrUser"("email");

-- AddForeignKey
ALTER TABLE "KrUser" ADD CONSTRAINT "KrUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "KrRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KrRequest" ADD CONSTRAINT "KrRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "KrEmployee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
