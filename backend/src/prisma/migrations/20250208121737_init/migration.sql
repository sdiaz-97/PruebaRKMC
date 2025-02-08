/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `KrRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KrRequest_id_key" ON "KrRequest"("id");
