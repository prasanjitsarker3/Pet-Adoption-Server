-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANEGER', 'USER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
