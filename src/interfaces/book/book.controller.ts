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
import { FindAllBooksUseCase } from "../../application/book/find-all-books.usecase";
import { PageableRequestSchema } from "../dtos/pageable/global-pageable.dto";

export class BookController {
  constructor(
    private readonly registerBookUseCase: RegisterBookUsecase,
    private readonly listBookUseCase: ListBookUseCase,
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
