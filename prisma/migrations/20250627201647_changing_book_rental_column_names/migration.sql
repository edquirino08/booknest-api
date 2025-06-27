/*
  Warnings:

  - The primary key for the `book_rental` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookId` on the `book_rental` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `book_rental` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `book_rental` table. All the data in the column will be lost.
  - Added the required column `book_id` to the `book_rental` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `book_rental` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `rental_time` to the `book_rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `book_rental` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "book_rental" DROP CONSTRAINT "book_rental_bookId_fkey";

-- DropForeignKey
ALTER TABLE "book_rental" DROP CONSTRAINT "book_rental_userId_fkey";

-- AlterTable
ALTER TABLE "book_rental" DROP CONSTRAINT "book_rental_pkey",
DROP COLUMN "bookId",
DROP COLUMN "userId",
DROP COLUMN "uuid",
ADD COLUMN     "book_id" INTEGER NOT NULL,
ADD COLUMN     "id" UUID NOT NULL,
ADD COLUMN     "rental_time" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "book_rental_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "book_rental" ADD CONSTRAINT "book_rental_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_rental" ADD CONSTRAINT "book_rental_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
