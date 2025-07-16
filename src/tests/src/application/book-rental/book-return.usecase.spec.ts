import { randomUUID } from "crypto";
import { BookReturnUseCase } from "../../../../application/book-rental/book-return.usecase";
import { FindBookByIdUseCase } from "../../../../application/book/find-book-by-id.usecase";
import { BookRental } from "../../../../domain/book-rental/book-rental.entity";
import { BookRentalRepository } from "../../../../domain/book-rental/book-rental.repository";
import { User } from "../../../../domain/user/user.entity";
import { UserRepository } from "../../../../domain/user/user.repository";
import { Book } from "../../../../domain/book/book.entity";
import { BadRequestException } from "../../../../interfaces/exceptions/exception-handler";

describe("BookReturnUseCase", () => {
  let bookRentalRepository: jest.Mocked<BookRentalRepository>;
  let userRepository: jest.Mocked<UserRepository>;
  let findBookByIdUseCase: jest.Mocked<FindBookByIdUseCase>;
  let usecase: BookReturnUseCase;

  beforeEach(() => {
    bookRentalRepository = {
      findUserActiveBookRental: jest.fn(),
      bookReturn: jest.fn(),
    } as any;
    userRepository = {
      findById: jest.fn(),
    } as any;
    findBookByIdUseCase = {
      execute: jest.fn(),
    } as any;

    usecase = new BookReturnUseCase(
      bookRentalRepository,
      userRepository,
      findBookByIdUseCase
    );
  });

  test("Should return the book rental successfully", async () => {
    const user = new User({
      id: 1,
      name: "Test",
      username: "username",
      email: "email@email.com",
      password: "pass",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });
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
    const rental = new BookRental({
      id: randomUUID(),
      book: book,
      book_id: book.id,
      user: user,
      user_id: 1,
      returned: false,
      rental_time: 6,
      date_reg: new Date(),
      return_date: null,
    });

    userRepository.findById.mockResolvedValue(user);
    findBookByIdUseCase.execute.mockResolvedValue(book);
    bookRentalRepository.findUserActiveBookRental.mockResolvedValue([rental]);

    const request = {
      bookId: book.id,
      userId: user.id,
    };

    await usecase.execute(request);

    expect(bookRentalRepository.bookReturn).toHaveBeenCalledTimes(1);
  });

  test("Should throw an exception when the requested user cannot be found", async () => {
    const user = new User({
      id: 1,
      name: "Test",
      username: "username",
      email: "email@email.com",
      password: "pass",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });
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

    userRepository.findById.mockResolvedValue(null);

    const request = {
      bookId: book.id,
      userId: user.id,
    };

    await expect(usecase.execute(request)).rejects.toThrow(BadRequestException);

    userRepository.findById.mockResolvedValue(user);
    findBookByIdUseCase.execute.mockResolvedValue(book);
    bookRentalRepository.findUserActiveBookRental.mockResolvedValue([]);

    await expect(usecase.execute(request)).rejects.toThrow(BadRequestException);
  });
});
