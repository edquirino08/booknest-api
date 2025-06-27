import {
  BookRental,
  BookRentalProps,
} from "../../domain/book-rental/book-rental.entity";
import { BookRentalRepository } from "../../domain/book-rental/book-rental.repository";
import { UserRepository } from "../../domain/user/user.repository";
import { RegisterRentalRequestDto } from "../../interfaces/dto/book-rental/register-rental.dto";
import { BadRequestException } from "../../interfaces/exceptions/exception-handler";
import { AvailabilityForRentalUseCase } from "./availability-for-rental.usecase";

export class RegisterRentalUseCase {
  constructor(
    private readonly bookRentalRepository: BookRentalRepository,
    private readonly availabilityForRentalUseCase: AvailabilityForRentalUseCase,
    private readonly userRepository: UserRepository
  ) {}

  async execute(
    requestDto: RegisterRentalRequestDto
  ): Promise<RegisterRentalRequestDto> {
    const user = await this.userRepository.findById(requestDto.userId);
    if (!user) {
      throw new BadRequestException(
        `There is no user with id: ${requestDto.userId}`
      );
    }

    const avaiable = await this.availabilityForRentalUseCase.execute(
      requestDto.bookId
    );

    if (!avaiable) {
      throw new BadRequestException(`Book not available to rent.`);
    }

    const newRental = {
      book_id: requestDto.bookId,
      user_id: requestDto.userId,
      rental_time: requestDto.rentalTime,
    } as BookRentalProps;

    await this.bookRentalRepository.register(new BookRental(newRental));

    return requestDto;
  }
}
