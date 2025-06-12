-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "copies" INTEGER NOT NULL,
    "description" TEXT,
    "published_at" TIMESTAMP(3),
    "genre" TEXT,
    "pages" INTEGER,
    "language" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "rating" DOUBLE PRECISION,
    "date_reg" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_name_key" ON "book"("name");
