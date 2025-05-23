/*
  Warnings:

  - Added the required column `title` to the `Casa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Casa" ADD COLUMN     "title" TEXT NOT NULL;
