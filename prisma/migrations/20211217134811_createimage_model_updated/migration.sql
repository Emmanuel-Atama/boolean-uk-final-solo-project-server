/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Images` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Images_profileId_key" ON "Images"("profileId");
