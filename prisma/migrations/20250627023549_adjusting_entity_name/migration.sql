/*
  Warnings:

  - You are about to drop the `BookRental` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BookRental";

-- CreateTable
CREATE TABLE "book_rental" (
    "uuid" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "date_reg" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return_date" TIMESTAMP(3),

    CONSTRAINT "book_rental_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "book_rental" ADD CONSTRAINT "book_rental_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_rental" ADD CONSTRAINT "book_rental_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
