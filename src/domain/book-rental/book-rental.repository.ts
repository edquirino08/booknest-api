import { BookRental } from "./book-rental.entity";

export interface BookRentalRepository {
  register(bookRental: BookRental): Promise<BookRental>;
  countRentedBooksById(bookId: number): Promise<number>;
  findUserActiveBookRental(
    bookId: number,
    userId: number
  ): Promise<BookRental[]>;
  bookReturn(id: string): Promise<void>;
}
