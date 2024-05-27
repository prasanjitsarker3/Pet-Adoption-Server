/*
  Warnings:

  - You are about to drop the column `petOwnershipExperience` on the `AdoptionRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdoptionRequest" DROP COLUMN "petOwnershipExperience",
ADD COLUMN     "additionalInfo" TEXT,
ADD COLUMN     "agreementToTerms" BOOLEAN NOT NULL DEFAULT false;
