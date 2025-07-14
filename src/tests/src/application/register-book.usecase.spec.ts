import RegisterBookUsecase from "../../../application/book/register-book.usecase";
import { Book, BookProps } from "../../../domain/book/book.entity";
import { BookRepository } from "../../../domain/book/book.respository";
import { BadRequestException } from "../../../interfaces/exceptions/exception-handler";

describe("RegisterBookUsecase", () => {
  let bookRepository: jest.Mocked<BookRepository>;
  let usecase: RegisterBookUsecase;

  beforeEach(() => {
    bookRepository = {
      findByNameAndAuthorAndPubliser: jest.fn(),
      register: jest.fn(),
    } as any;
    usecase = new RegisterBookUsecase(bookRepository);
  });

  test("Should throw a BadRequestException when registering a new user", async () => {
    const bookProps: BookProps = {
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
    };

    const book = new Book(bookProps);

    bookRepository.findByNameAndAuthorAndPubliser.mockResolvedValue(book);

    const { dateReg, ...request } = bookProps;

    await expect(usecase.execute(request)).rejects.toThrow(BadRequestException);
  });

  test("Should register a new user successfully", async () => {
    const request = {
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
    };

    const book = new Book({
      ...request,
      dateReg: new Date(),
    });

    bookRepository.findByNameAndAuthorAndPubliser.mockResolvedValue(null);
    bookRepository.register.mockResolvedValue(book);

    const response = await usecase.execute(request);

    expect(response).toHaveProperty("props.name", request.name);
    expect(bookRepository.register).toHaveBeenCalledTimes(1);
  });
});
