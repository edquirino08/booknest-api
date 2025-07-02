import { BookRepository } from "../../domain/book/book.respository";

export class FinAllAvailableBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute() {
    const data = await this.bookRepository.findAllAvailable();
    return data;
  }
}
