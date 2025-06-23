-- CreateTable
CREATE TABLE "book_rental" (
    "uuid" TEXT NOT NULL,
    "id_book" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "date_reg" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return_date" TIMESTAMP(3),

    CONSTRAINT "book_rental_pkey" PRIMARY KEY ("uuid")
);
