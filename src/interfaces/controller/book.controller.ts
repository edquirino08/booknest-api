import { FastifyRequest } from "fastify/types/request";
import RegisterBookUsecase from "../../application/book/register-book.usecase";
import { FastifyReply } from "fastify";
import { RegisterBookSchema } from "../dto/book/register-book.dto";
import { ZodValidationException } from "../exceptions/exception-handler";
import { HttpPresenter } from "../presenters/http.presenter";
import { FindAllBooksUseCase } from "../../application/book/find-all-books.usecase";
import { GenericFilteringAndPaginationSchema } from "../dto/utils/generic-filtering-pagination.dto";
import { BookResponseDto } from "../dto/book/list-books.dto";
import { UpdateBookUseCase } from "../../application/book/update-book.usecase";
import { UpdateBookSchema } from "../dto/book/update-book.dto";

export class BookController {
  constructor(
    private readonly registerBookUseCase: RegisterBookUsecase,
    private readonly findAllBooksUseCase: FindAllBooksUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase
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
    const parsedQuery = GenericFilteringAndPaginationSchema.safeParse(
      req.query
    );
    if (!parsedQuery.success) {
      throw new ZodValidationException(parsedQuery.error.errors);
    }
    const data = await this.findAllBooksUseCase.execute(parsedQuery.data);
    return HttpPresenter.ok(reply, "Books listed successfuly!", data);
  }

  async update(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<BookResponseDto> {
    const data = UpdateBookSchema.safeParse(req.body);
    if (data.error) {
      throw new ZodValidationException(data.error.errors);
    }
    const res = await this.updateBookUseCase.execute(data.data);
    return HttpPresenter.ok(reply, "Book updated successfuly!", res);
  }
}
