import { PrismaClient } from "@prisma/client";
import { Book } from "../../../domain/book/book.entity";
import { BookRepository } from "../../../domain/book/book.respository";
import { PrismaFilteringData } from "../../../application/services/prisma-filtering.service";

export class BookRepositoryImpl implements BookRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async register(book: Book): Promise<Book> {
    const createdBook = await this.prisma.book.create({
      data: {
        name: book.name,
        author: book.author,
        publisher: book.publisher,
        copies: book.copies,
        description: book.description,
        published_at: book.publishedAt,
        genre: book.genre,
        pages: book.pages,
        language: book.language,
        available: book.available,
        rating: book.rating,
        date_reg: book.dateReg,
      },
    });
    return new Book({ ...createdBook });
  }

  async findByNameAndAuthorAndPubliser(
    name: string,
    author: string,
    publisher: string
  ): Promise<Book | null> {
    const data = await this.prisma.book.findFirst({
      where: {
        AND: [{ name: name }, { author: author }, { publisher: publisher }],
      },
    });
    return data ? new Book({ ...data }) : null;
  }

  async findByName(name: string): Promise<Book[]> {
    const data = await this.prisma.book.findMany({
      where: {
        AND: [{ name: name }, { available: true }],
      },
    });
    return data.map((book: any) => new Book({ ...book }));
  }

  async findAll(args: PrismaFilteringData): Promise<Book[] | undefined> {
    const data = await this.prisma.book.findMany(args);
    return data.map((book: any) => new Book({ ...book }));
  }
}
