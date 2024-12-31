/*
  Warnings:

  - Added the required column `status` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "App" ADD COLUMN     "framework" VARCHAR(20),
ADD COLUMN     "status" BOOLEAN NOT NULL;
