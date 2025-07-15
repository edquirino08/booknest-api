import { UpdateBookUseCase } from "../../../../application/book/update-book.usecase";
import { Book } from "../../../../domain/book/book.entity";
import { BookRepository } from "../../../../domain/book/book.respository";
import { BadRequestException } from "../../../../interfaces/exceptions/exception-handler";

describe("UpdateBookUseCase", () => {
  let bookRepository: jest.Mocked<BookRepository>;
  let usecase: UpdateBookUseCase;

  beforeEach(() => {
    bookRepository = {
      findAll: jest.fn(),
      update: jest.fn(),
    } as any;
    usecase = new UpdateBookUseCase(bookRepository);
  });

  test("Should update a book successfully", async () => {
    let updateBookDto = {
      id: 1,
      available: true,
      rating: 4.5,
      description: "Generic Description",
      copies: 10,
      genre: "Ficção",
    };

    const book = new Book({
      id: 1,
      name: "Test",
      author: "",
      publisher: "",
      copies: 10,
      description: "Generic Description",
      publishedAt: undefined,
      genre: "Ficção",
      pages: undefined,
      language: undefined,
      available: true,
      rating: 4.5,
      dateReg: new Date(),
    });

    bookRepository.findAll.mockResolvedValue([book]);

    const data = await usecase.execute(updateBookDto);

    expect(data).toBeDefined();
    expect(data).toHaveProperty("name", book.name);
    expect(bookRepository.update).toHaveBeenCalledTimes(1);
  });

  test("Should throw and exception when updating a book", async () => {
    let updateBookDto = {
      id: 1,
      available: true,
      rating: 4.5,
      description: "Generic Description",
      copies: 10,
      genre: "Ficção",
    };

    bookRepository.findAll.mockResolvedValue(undefined);

    await expect(usecase.execute(updateBookDto)).rejects.toThrow(
      BadRequestException
    );

    const book = new Book({
      id: 1,
      name: "Test",
      author: "",
      publisher: "",
      copies: 10,
      description: "Generic Description",
      publishedAt: undefined,
      genre: "Ficção",
      pages: undefined,
      language: undefined,
      available: true,
      rating: 4.5,
      dateReg: new Date(),
    });

    bookRepository.findAll.mockResolvedValue([book, book]);

    await expect(usecase.execute(updateBookDto)).rejects.toThrow(Error);
  });
});
