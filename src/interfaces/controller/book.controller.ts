import { FastifyRequest } from "fastify/types/request";
import RegisterBookUsecase from "../../application/book/register-book.usecase";
import { FastifyReply } from "fastify";
import { RegisterBookSchema } from "../dto/book/register-book.dto";
import { ZodValidationException } from "../exceptions/exception-handler";
import { HttpPresenter } from "../presenters/http.presenter";
import { FindAllBooksUseCase } from "../../application/book/find-all-books.usecase";
import { PageableRequestSchema } from "../dto/pageable/global-pageable.dto";

export class BookController {
  constructor(
    private readonly registerBookUseCase: RegisterBookUsecase,
    private readonly findAllBooksUseCase: FindAllBooksUseCase
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

  async findAll(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const parsedQuery = PageableRequestSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      throw new ZodValidationException(parsedQuery.error.errors);
    }
    const data = await this.findAllBooksUseCase.execute(parsedQuery.data);
    return HttpPresenter.ok(reply, "Books listed successfuly!", data);
  }
}
