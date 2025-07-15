import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DeleteBookUseCase } from "../../../../application/book/delete-book.usecase";
import { Book } from "../../../../domain/book/book.entity";
import { BookRepository } from "../../../../domain/book/book.respository";
import { BadRequestException } from "../../../../interfaces/exceptions/exception-handler";

describe("DeleteBookUseCase", () => {
  let bookRepository: jest.Mocked<BookRepository>;
  let usecase: DeleteBookUseCase;

  beforeEach(() => {
    bookRepository = {
      findAll: jest.fn(),
      delete: jest.fn(),
    } as any;
    usecase = new DeleteBookUseCase(bookRepository);
  });

  test("Should throw an exception when deleting a book", async () => {
    await expect(usecase.execute(1)).rejects.toThrow(BadRequestException);
  });

  test("Should delete a book successfully", async () => {
    const book = new Book({
      id: 1,
      name: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      publisher: "Addison-Wesley",
      copies: 10,
      description: "A guide to pragmatic thinking and coding practices.",
      publishedAt: new Date("1999-10-30"),
      genre: "Software Development",
      pages: 352,
      language: "English",
      available: true,
      rating: 4.7,
      dateReg: new Date(),
    });

    bookRepository.findAll.mockResolvedValue([book]);
    bookRepository.delete.mockImplementation(async (_id: number) => {
      return;
    });

    await usecase.execute(1);

    expect(bookRepository.findAll).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
    expect(bookRepository.delete).toHaveBeenCalledWith(1);
  });

  test("Should throw an exception when acessing the database to delete the user", async () => {
    const book = new Book({
      id: 1,
      name: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      publisher: "Addison-Wesley",
      copies: 10,
      description: "A guide to pragmatic thinking and coding practices.",
      publishedAt: new Date("1999-10-30"),
      genre: "Software Development",
      pages: 352,
      language: "English",
      available: true,
      rating: 4.7,
      dateReg: new Date(),
    });

    bookRepository.findAll.mockResolvedValue([book]);
    const error = Object.create(PrismaClientKnownRequestError.prototype);
    Object.assign(error, {
      code: "P2000",
      clientVersion: "4.0.0",
      message: "Simulated Prisma error",
    });

    bookRepository.delete.mockRejectedValue(error);

    await expect(usecase.execute(1)).rejects.toThrow(BadRequestException);
  });

  test("Should throw an generic exception when acessing the database to delete the user", async () => {
    const book = new Book({
      id: 1,
      name: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      publisher: "Addison-Wesley",
      copies: 10,
      description: "A guide to pragmatic thinking and coding practices.",
      publishedAt: new Date("1999-10-30"),
      genre: "Software Development",
      pages: 352,
      language: "English",
      available: true,
      rating: 4.7,
      dateReg: new Date(),
    });

    bookRepository.findAll.mockResolvedValue([book]);
    bookRepository.delete.mockRejectedValue(new Error());

    await expect(usecase.execute(1)).rejects.toThrow(Error);
  });
});
