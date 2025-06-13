import { BookRepository } from "../../domain/book/book.respository";
import { ListBookResponseDto } from "../../interfaces/book/dto/list-books.dto";

export class ListBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(name: string): Promise<ListBookResponseDto> {
    const books = await this.bookRepository.findByName(name);
    return { books: [...books] };
  }
}
