import { Book, BookProps } from "../../domain/book/book.entity";
import { BookRepository } from "../../domain/book/book.respository";
import { Loggable } from "../../infra/observability/loggable";
import {
  RegisterBookRequestDto,
  RegisterBookResponseDto,
} from "../../interfaces/book/dto/register-book.dto";
import { BadRequestException } from "../../interfaces/exceptions/exception-handler";

export default class RegisterBookUsecase {
  constructor(private readonly bookRepository: BookRepository) {}

  @Loggable()
  async execute(req: RegisterBookRequestDto): Promise<RegisterBookResponseDto> {
    const book = await this.bookRepository.findByNameAndAuthorAndPubliser(
      req.name,
      req.author,
      req.publisher
    );

    if (book) {
      throw new BadRequestException(`Book '${book.name}' already registred`);
    }

    const newBook = new Book({
      ...req,
      id: 0,
      dateReg: new Date(),
    } as BookProps);

    const data = await this.bookRepository.register(newBook);

    const { id, ...response } = data;
    return response as RegisterBookResponseDto;
  }
}
