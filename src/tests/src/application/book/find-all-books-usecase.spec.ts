import { FindAllBooksUseCase } from "../../../../application/book/find-all-books.usecase";
import { Book } from "../../../../domain/book/book.entity";
import { BookRepository } from "../../../../domain/book/book.respository";
import { BadRequestException } from "../../../../interfaces/exceptions/exception-handler";
import { Prisma } from "../../../../../prisma/generated";
jest.mock("../../../../application/services/prisma-filtering.service");

describe("FindAllBooksUseCase", () => {
  let bookRepository: jest.Mocked<BookRepository>;
  let usecase: FindAllBooksUseCase;

  beforeEach(() => {
    bookRepository = {
      findAll: jest.fn(),
    } as any;
    usecase = new FindAllBooksUseCase(bookRepository);
  });

  test("Should find all books by the requested params", async () => {
    const pageable = {
      page: 0,
      size: 10,
      sort: ["id,asc"],
    };
    bookRepository.findAll.mockResolvedValue([
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
    ]);

    const response = await usecase.execute(pageable);

    expect(response.books).toHaveLength(1);
    expect(response.books).toBeDefined();
    expect(response.books![0]).toHaveProperty("name", "Test");
    expect(bookRepository.findAll).toHaveBeenCalledTimes(1);

    bookRepository.findAll.mockResolvedValue(undefined);

    await usecase.execute(pageable);

    expect(bookRepository.findAll).toHaveBeenCalledTimes(2);
  });

  test("Should throw an Error when finding all books", async () => {
    const pageable = {
      page: 0,
      size: 10,
      sort: ["id,asc"],
    };
    bookRepository.findAll.mockRejectedValue(new Error());

    expect(usecase.execute(pageable)).rejects.toThrow(new Error());
  });

  test("Should throw an PrismaClientValidationError when finding all books", async () => {
    const pageable = {
      page: 0,
      size: 10,
      sort: ["id,asc"],
    };

    const message = `Unknown argument \`abc\` on \`where\`. Available options are marked with ?.\n`;

    const prismaValidationError = {
      name: "PrismaClientValidationError",
      message,
    } as unknown as Prisma.PrismaClientValidationError;

    bookRepository.findAll.mockRejectedValue(prismaValidationError);

    await expect(usecase.execute(pageable)).rejects.toThrow(
      BadRequestException
    );

    bookRepository.findAll.mockRejectedValue(undefined);

    await expect(usecase.execute(pageable)).rejects.toBeUndefined();
  });
});
