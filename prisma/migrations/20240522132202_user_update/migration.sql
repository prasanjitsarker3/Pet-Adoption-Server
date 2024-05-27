-- CreateEnum
CREATE TYPE "Action" AS ENUM ('Activate', 'Deactivate');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "action" "Action" NOT NULL DEFAULT 'Activate';
