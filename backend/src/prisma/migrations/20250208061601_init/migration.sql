/*
  Warnings:

  - Added the required column `isActive` to the `KrRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KrRequest" ADD COLUMN     "isActive" BOOLEAN NOT NULL;
