import { BookRepository } from "../../domain/book/book.respository";
import { Loggable } from "../../infra/observability/loggable";
import { ListBookResponseDto } from "../../interfaces/dto/book/list-books.dto";
import { PageableRequestDto } from "../../interfaces/dto/pageable/global-pageable.dto";
import { Pageable } from "../services/pageable";

export class FindAllBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  @Loggable()
  async execute(query: PageableRequestDto): Promise<ListBookResponseDto> {
    const pageable = Pageable.execute(query);
    const data = await this.bookRepository.findAll(pageable);
    return {
      books: data,
      pageable: {
        page: query.page,
        size: query.size,
        numberOfElements: data.length,
      },
    };
  }
}
