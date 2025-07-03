import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterRentalUseCase } from "../../application/book-rental/register-rental.usecase";
import { RegisterRentalSchema } from "../dto/book-rental/register-rental.dto";
import { ZodValidationException } from "../exceptions/exception-handler";
import { HttpPresenter } from "../presenters/http.presenter";
import { BookReturnSchema } from "../dto/book-rental/book-return.dto";
import { BookReturnUseCase } from "../../application/book-rental/book-return.usecase";

export class BookRentalController {
  constructor(
    private readonly registerRentalUseCase: RegisterRentalUseCase,
    private readonly bookReturnUseCase: BookReturnUseCase
  ) {}

  async register(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const parsedBody = RegisterRentalSchema.safeParse(request.body);

    if (parsedBody.error) {
      throw new ZodValidationException(parsedBody.error.errors);
    }

    const data = await this.registerRentalUseCase.execute(parsedBody.data);

    return HttpPresenter.ok(reply, "Rental registered successfully!", data);
  }

  async bookReturn(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const parsedBody = BookReturnSchema.safeParse(request.body);

    if (parsedBody.error) {
      throw new ZodValidationException(parsedBody.error.errors);
    }

    await this.bookReturnUseCase.execute(parsedBody.data);

    return HttpPresenter.ok(reply, "Rental returned successfully!");
  }
}
