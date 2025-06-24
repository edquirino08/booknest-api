import { Book } from "../../domain/book/book.entity";
import { BookRepository } from "../../domain/book/book.respository";
import { BookResponseDto } from "../../interfaces/dto/book/list-books.dto";
import { UpdateBookDto } from "../../interfaces/dto/book/update-book.dto";
import { BadRequestException } from "../../interfaces/exceptions/exception-handler";
import {
  PrismaFilteringData,
  PrismaFilteringService,
} from "../services/prisma-filtering.service";

export class UpdateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(req: UpdateBookDto): Promise<BookResponseDto> {
    const book = await this.findAndValidateRequestedBook(req.id);
    this.setNewValues(req, book);
    this.bookRepository.update(book);
    return book as BookResponseDto;
  }

  private async findAndValidateRequestedBook(id: number): Promise<Book> {
    const book = await this.bookRepository.findAll({
      where: {
        id: id,
      },
    });
    if (!book || book.length == 0) {
      throw new BadRequestException(`Dont exists any book with id ${id}`);
    }

    if (book.length > 1) {
      throw new Error(`Duplicated entry in entity book for id ${id}`);
    }
    return book[0];
  }

  private setNewValues(req: UpdateBookDto, book: Book) {
    if (req.available != null || req.available != undefined) {
      book.available = req.available;
    }
    if (req.copies) {
      book.copies = req.copies;
    }
    if (req.description !== undefined) {
      book.description = req.description;
    }
    if (req.genre !== undefined) {
      book.genre = req.genre;
    }
    if (req.rating) {
      book.rating = req.rating;
    }
  }
}
