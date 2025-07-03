import { BookRentalRepository } from "../../domain/book-rental/book-rental.repository";
import { UserRepository } from "../../domain/user/user.repository";
import { BookReturnRequestDto } from "../../interfaces/dto/book-rental/book-return.dto";
import { BadRequestException } from "../../interfaces/exceptions/exception-handler";
import { FindBookByIdUseCase } from "../book/find-book-by-id.usecase";

export class BookReturnUseCase {
  constructor(
    private readonly bookRentalRepository: BookRentalRepository,
    private readonly userRepository: UserRepository,
    private readonly findBookByIdUseCase: FindBookByIdUseCase
  ) {}

  async execute(requestDto: BookReturnRequestDto) {
    const user = await this.userRepository.findById(requestDto.userId);

    if (!user) {
      throw new BadRequestException(
        `Dont exists any user with requested id: ${requestDto.userId}`
      );
    }

    const book = await this.findBookByIdUseCase.execute(requestDto.bookId);

    const bookRental = await this.bookRentalRepository.findUserActiveBookRental(
      requestDto.bookId,
      requestDto.userId
    );

    if (!bookRental || bookRental.length === 0) {
      throw new BadRequestException(
        `Dont exists any active rental for the book '${book.name}' by the user '${user.name}'.`
      );
    }

    await this.bookRentalRepository.bookReturn(bookRental[0].id);
  }
}
