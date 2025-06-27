import { PrismaFilteringData } from "../../application/services/prisma-filtering.service";
import { Book } from "./book.entity";

export interface BookRepository {
  register(book: Book): Promise<Book>;
  findByNameAndAuthorAndPubliser(
    name: string,
    author: string,
    publiser: string
  ): Promise<Book | null>;
  findByName(name: string): Promise<Book[]>;
  findAll(args: PrismaFilteringData): Promise<Book[] | undefined>;
  update(book: Book): Promise<void>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Book>;
}
