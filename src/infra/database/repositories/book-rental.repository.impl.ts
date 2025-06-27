import { PrismaClient } from "@prisma/client";
import { BookRental } from "../../../domain/book-rental/book-rental.entity";
import { BookRentalRepository } from "../../../domain/book-rental/book-rental.repository";

export class BookRentalRepositoryImpl implements BookRentalRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async register(bookRental: BookRental): Promise<BookRental> {
    const data = this.prisma.book_rental.create({
      data: {
        book_id: bookRental.bookId,
        user_id: bookRental.userId,
        rental_time: bookRental.rentalTime,
        returned: false,
      },
    });

    return data as BookRental;
  }

  async countRentedBooksById(bookId: number): Promise<number> {
    return await this.prisma.book_rental.count({
      where: {
        book_id: bookId,
        returned: false,
      },
    });
  }
}
