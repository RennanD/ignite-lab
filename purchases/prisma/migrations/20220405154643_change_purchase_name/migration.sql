/*
  Warnings:

  - You are about to drop the `Purschase` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'APPROVED', 'FAILED');

-- DropForeignKey
ALTER TABLE "Purschase" DROP CONSTRAINT "Purschase_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Purschase" DROP CONSTRAINT "Purschase_productId_fkey";

-- DropTable
DROP TABLE "Purschase";

-- DropEnum
DROP TYPE "PurschaseStatus";

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "status" "PurchaseStatus" NOT NULL,
    "customerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
