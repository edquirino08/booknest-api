import { FastifyRequest } from "fastify/types/request";
import RegisterBookUsecase from "../../application/book/register-book.usecase";
import { FastifyReply } from "fastify";
import { RegisterBookSchema } from "./dto/register-book.dto";
import {
  BadRequestException,
  ZodValidationException,
} from "../exceptions/exception-handler";
import { HttpPresenter } from "../presenters/http.presenter";
import { ListBookUseCase } from "../../application/book/list-book.usecase";

export class BookController {
  constructor(
    private readonly registerBookUseCase: RegisterBookUsecase,
    private readonly listBookUseCase: ListBookUseCase
  ) {}

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

  async list(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { name } = req.headers as { name: string };
    if (!name) {
      throw new BadRequestException("Request header 'name' is required.");
    }
    return HttpPresenter.ok(
      reply,
      "Books listed successfuly!",
      await this.listBookUseCase.execute(name)
    );
  }
}
