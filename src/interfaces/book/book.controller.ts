import { FastifyRequest } from "fastify/types/request";
import RegisterBookUsecase from "../../application/book/register-book.usecase";
import { FastifyReply } from "fastify";
import { RegisterBookSchema } from "./dto/register-book.dto";
import { ZodValidationException } from "../exceptions/exception-handler";
import { HttpPresenter } from "../presenters/http.presenter";

export class BookController {
  constructor(private readonly registerBookUseCase: RegisterBookUsecase) {}

  async register(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const parsedBody = RegisterBookSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ZodValidationException(parsedBody.error.errors);
    }

    return HttpPresenter.ok(
      reply,
      "Book registred successfuly!",
      await this.registerBookUseCase.execute(parsedBody.data)
    );
  }
}
