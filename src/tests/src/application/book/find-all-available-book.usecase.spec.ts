import { FinAllAvailableBooksUseCase } from "../../../../application/book/find-all-available-book.usecase";
import { Book } from "../../../../domain/book/book.entity";
import { BookRepository } from "../../../../domain/book/book.respository";

describe("FinAllAvailableBooksUseCase", () => {
  let bookRepository: jest.Mocked<BookRepository>;
  let usecase: FinAllAvailableBooksUseCase;

  beforeEach(() => {
    bookRepository = {
      findAllAvailable: jest.fn(),
    } as any;
    usecase = new FinAllAvailableBooksUseCase(bookRepository);
  });

  test("Should find all available books to rent", async () => {
    const books: Book[] = [
      new Book({
        id: 0,
        name: "Test",
        author: "",
        publisher: "",
        copies: 0,
        description: undefined,
        publishedAt: undefined,
        genre: undefined,
        pages: undefined,
        language: undefined,
        available: false,
        rating: undefined,
        dateReg: new Date(),
      }),
    ];
    bookRepository.findAllAvailable.mockResolvedValue(books);

    const response = await usecase.execute();

    expect(response.length).toEqual(1);
    expect(response[0]).toHaveProperty("name", "Test");
    expect(bookRepository.findAllAvailable).toHaveBeenCalledTimes(1);
  });
});
