/*
  Warnings:

  - You are about to drop the column `adoptionRequirements` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `medicalHistory` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `temperament` on the `pets` table. All the data in the column will be lost.
  - The `species` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `healthStatus` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photos` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "Species" AS ENUM ('DOG', 'CAT', 'BIRD', 'RABBIT', 'REPTILE', 'FISH', 'OTHER');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "adoptionRequirements",
DROP COLUMN "medicalHistory",
DROP COLUMN "temperament",
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'UNKNOWN',
ADD COLUMN     "healthStatus" TEXT NOT NULL,
ADD COLUMN     "photos" TEXT NOT NULL,
ALTER COLUMN "size" SET DEFAULT 'SMALL',
DROP COLUMN "species",
ADD COLUMN     "species" "Species" NOT NULL DEFAULT 'OTHER';
