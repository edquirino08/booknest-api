import { BookRentalRepository } from "../../domain/book-rental/book-rental.repository";
import { FindBookByIdUseCase } from "../book/find-book-by-id.usecase";

export class AvailabilityForRentalUseCase {
  constructor(
    private readonly bookRentalRepository: BookRentalRepository,
    private readonly findBookByIdUseCase: FindBookByIdUseCase
  ) {}

  async execute(bookId: number): Promise<boolean> {
    const book = await this.findBookByIdUseCase.execute(bookId);

    if (!book.available) {
      return false;
    }

    const rentalsNumber = await this.bookRentalRepository.countRentedBooksById(
      bookId
    );

    return rentalsNumber < book.copies;
  }
}
