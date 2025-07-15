import { BookRepository } from "../../domain/book/book.respository";
import { ListBookResponseDto } from "../../interfaces/dto/book/list-books.dto";
import { GenericFilteringAndPaginationDto } from "../../interfaces/dto/utils/generic-filtering-pagination.dto";
import { BadRequestException } from "../../interfaces/exceptions/exception-handler";
import { PrismaFilteringService } from "../services/prisma-filtering.service";

export class FindAllBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(
    query: GenericFilteringAndPaginationDto
  ): Promise<ListBookResponseDto> {
    try {
      const args = PrismaFilteringService.execute(query);
      const data = await this.bookRepository.findAll(args);
      return {
        books: data,
        pageable: {
          page: query.page,
          size: query.size,
          numberOfElements: (data ?? []).length,
        },
      };
    } catch (err) {
      if ((err as any)?.name === "PrismaClientValidationError") {
        const message = (err as Error).message;
        let errorMsg = message;

        const match = RegExp(/Unknown argument.*(\n|$)/).exec(message);
        if (match) {
          errorMsg = match[0]
            .replace("Available options are marked with ?.", "")
            .trim();
        }
        throw new BadRequestException(errorMsg);
      }
      throw err;
    }
  }
}
