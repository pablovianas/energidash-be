/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_customerId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "customerId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Customer";
