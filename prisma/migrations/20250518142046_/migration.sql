/*
  Warnings:

  - Changed the type of `totalPrice` on the `Prenotazioni` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Prenotazioni" DROP COLUMN "totalPrice",
ADD COLUMN     "totalPrice" INTEGER NOT NULL;
