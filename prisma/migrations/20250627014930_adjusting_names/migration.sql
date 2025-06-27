/*
  Warnings:

  - You are about to drop the `book_rental` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "book_rental";

-- CreateTable
CREATE TABLE "BookRental" (
    "uuid" TEXT NOT NULL,
    "id_book" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "date_reg" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return_date" TIMESTAMP(3),

    CONSTRAINT "BookRental_pkey" PRIMARY KEY ("uuid")
);
