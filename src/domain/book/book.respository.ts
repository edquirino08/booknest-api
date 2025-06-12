import { Book } from "./book.entity";

export interface BookRepository {
  register(book: Book): Promise<Book>;
  findByNameAndAuthorAndPubliser(
    name: string,
    author: string,
    publiser: string
  ): Promise<Book | null>;
}
