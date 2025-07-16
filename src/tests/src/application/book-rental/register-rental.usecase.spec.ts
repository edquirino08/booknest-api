import { randomUUID } from "crypto";
import { AvailabilityForRentalUseCase } from "../../../../application/book-rental/availability-for-rental.usecase";
import { RegisterRentalUseCase } from "../../../../application/book-rental/register-rental.usecase";
import { BookRentalRepository } from "../../../../domain/book-rental/book-rental.repository";
import { Book } from "../../../../domain/book/book.entity";
import { User } from "../../../../domain/user/user.entity";
import { UserRepository } from "../../../../domain/user/user.repository";
import { BadRequestException } from "../../../../interfaces/exceptions/exception-handler";
import { BookRental } from "../../../../domain/book-rental/book-rental.entity";

describe("RegisterRentalUseCase", () => {
  let bookRentalRepository: jest.Mocked<BookRentalRepository>;
  let availabilityForRentalUseCase: jest.Mocked<AvailabilityForRentalUseCase>;
  let userRepository: jest.Mocked<UserRepository>;
  let usecase: RegisterRentalUseCase;

  beforeEach(() => {
    bookRentalRepository = {
      findUserActiveBookRental: jest.fn(),
      register: jest.fn(),
    } as any;
    availabilityForRentalUseCase = {
      execute: jest.fn(),
    } as any;
    userRepository = {
      findById: jest.fn(),
    } as any;

    usecase = new RegisterRentalUseCase(
      bookRentalRepository,
      availabilityForRentalUseCase,
      userRepository
    );
  });

  test("Should rent a book successfully", async () => {
    const requestDto = {
      bookId: 1,
      rentalTime: 6,
      userId: 1,
    };

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

    userRepository.findById.mockResolvedValue(user);
    availabilityForRentalUseCase.execute.mockResolvedValue(true);
    bookRentalRepository.findUserActiveBookRental.mockResolvedValue([]);

    const data = await usecase.execute(requestDto);

    expect(data).toBeDefined;
    expect(data).toEqual(requestDto);
    expect(bookRentalRepository.register).toHaveBeenCalledTimes(1);
  });

  test("Shoud throw an exception when requested user could not be find", async () => {
    const requestDto = {
      bookId: 1,
      rentalTime: 6,
      userId: 1,
    };
    userRepository.findById.mockResolvedValue(null);

    await expect(usecase.execute(requestDto)).rejects.toThrow(
      BadRequestException
    );
  });

  test("Should throw an exception when requested book is not available to rent", async () => {
    const requestDto = {
      bookId: 1,
      rentalTime: 6,
      userId: 1,
    };

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

    userRepository.findById.mockResolvedValue(user);
    availabilityForRentalUseCase.execute.mockResolvedValue(false);

    await expect(usecase.execute(requestDto)).rejects.toThrow(
      BadRequestException
    );
  });

  test("Should throw an exception when the user already has an active rental for requested book.", async () => {
    const requestDto = {
      bookId: 1,
      rentalTime: 6,
      userId: 1,
    };

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
    availabilityForRentalUseCase.execute.mockResolvedValue(true);
    bookRentalRepository.findUserActiveBookRental.mockResolvedValue([rental]);

    await expect(usecase.execute(requestDto)).rejects.toThrow(
      BadRequestException
    );
  });
});
