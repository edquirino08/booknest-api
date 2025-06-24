import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { BookRepository } from "../../domain/book/book.respository";
import { BadRequestException } from "../../interfaces/exceptions/exception-handler";

export class DeleteBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(id: number) {
    const book = await this.bookRepository.findAll({
      where: {
        id: id,
      },
    });
    if (!book || book.length == 0) {
      throw new BadRequestException(`Dont exists any boook with id: ${id}`);
    }

    try {
      await this.bookRepository.delete(id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(
          `Unable to delete requested book with id: ${id}`
        );
      }
      throw error;
    }
  }
}
