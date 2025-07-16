import { AvailabilityForRentalUseCase } from "../../../../application/book-rental/availability-for-rental.usecase";
import { FindBookByIdUseCase } from "../../../../application/book/find-book-by-id.usecase";
import { BookRentalRepository } from "../../../../domain/book-rental/book-rental.repository";
import { Book } from "../../../../domain/book/book.entity";

describe("AvailabilityForRentalUseCase", () => {
  let bookRepository: jest.Mocked<BookRentalRepository>;
  let findBookByIdUseCase: jest.Mocked<FindBookByIdUseCase>;
  let usecase: AvailabilityForRentalUseCase;

  beforeEach(() => {
    bookRepository = {
      countRentedBooksById: jest.fn(),
    } as any;
    findBookByIdUseCase = {
      execute: jest.fn(),
    } as any;
    usecase = new AvailabilityForRentalUseCase(
      bookRepository,
      findBookByIdUseCase
    );
  });

  test("Should return true to available for rent", async () => {
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
    findBookByIdUseCase.execute.mockResolvedValue(book);
    bookRepository.countRentedBooksById.mockResolvedValue(book.copies--);

    const response = await usecase.execute(1);

    expect(response).toBeTruthy;
  });

  test("Should return false checking if book can be rented", async () => {
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
      available: false,
      rating: 4.5,
      dateReg: new Date(),
    });
    findBookByIdUseCase.execute.mockResolvedValue(book);

    expect(usecase.execute(1)).resolves.toBeFalsy;
  });
});
