import { FindBookByIdUseCase } from "../../../../application/book/find-book-by-id.usecase";
import { Book } from "../../../../domain/book/book.entity";
import { BookRepository } from "../../../../domain/book/book.respository";
import { BadRequestException } from "../../../../interfaces/exceptions/exception-handler";

describe("FindBookByIdUseCase", () => {
  let bookRepository: jest.Mocked<BookRepository>;
  let usecase: FindBookByIdUseCase;

  beforeEach(() => {
    bookRepository = {
      findById: jest.fn(),
    } as any;
    usecase = new FindBookByIdUseCase(bookRepository);
  });

  test("Should find a book by requested id", async () => {
    bookRepository.findById.mockResolvedValue(
      new Book({
        id: 1,
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
      })
    );

    const book = await usecase.execute(1);

    expect(book).toBeDefined();
    expect(book).toHaveProperty("name", "Test");
    expect(bookRepository.findById).toHaveBeenCalledWith(1);
  });

  test("Should throw an exception when finding a book by the requested id", async () => {
    bookRepository.findById.mockResolvedValue(
      new Book({
        id: 0,
        name: "",
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
      })
    );

    await expect(usecase.execute(1)).rejects.toThrow(BadRequestException);

    bookRepository.findById.mockResolvedValue(undefined);

    await expect(usecase.execute(1)).rejects.toThrow(BadRequestException);
  });
});
