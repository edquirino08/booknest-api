import { Book } from "../../domain/book/book.entity";
import { BookRepository } from "../../domain/book/book.respository";
import { BadRequestException } from "../../interfaces/exceptions/exception-handler";

export class FindBookByIdUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(bookId: number): Promise<Book> {
    const book = await this.bookRepository.findById(bookId);
    if (!book?.id) {
      throw new BadRequestException(
        `There is no book with the requested id: ${bookId}`
      );
    }
    return book;
  }
}
