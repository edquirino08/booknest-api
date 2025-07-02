import { FastifyRequest } from "fastify/types/request";
import RegisterBookUsecase from "../../application/book/register-book.usecase";
import { FastifyReply } from "fastify";
import { RegisterBookSchema } from "../dto/book/register-book.dto";
import { ZodValidationException } from "../exceptions/exception-handler";
import { HttpPresenter } from "../presenters/http.presenter";
import { FindAllBooksUseCase } from "../../application/book/find-all-books.usecase";
import { GenericFilteringAndPaginationSchema } from "../dto/utils/generic-filtering-pagination.dto";
import { UpdateBookUseCase } from "../../application/book/update-book.usecase";
import { UpdateBookSchema } from "../dto/book/update-book.dto";
import { DeleteBookUseCase } from "../../application/book/delete-book.usecase";
import { DeleteBookDto, DeleteBookSchema } from "../dto/book/delete-book.dto";
import { FinAllAvailableBooksUseCase } from "../../application/book/find-all-available-book.usecase";

export class BookController {
  constructor(
    private readonly registerBookUseCase: RegisterBookUsecase,
    private readonly findAllBooksUseCase: FindAllBooksUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
    private readonly finAllAvailableBooksUseCase: FinAllAvailableBooksUseCase
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
      "Book registred successfully!",
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
    return HttpPresenter.ok(reply, "Books listed successfully!", data);
  }

  async update(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const data = UpdateBookSchema.safeParse(req.body);
    if (data.error) {
      throw new ZodValidationException(data.error.errors);
    }
    const res = await this.updateBookUseCase.execute(data.data);
    return HttpPresenter.ok(reply, "Book updated successfully!", res);
  }

  async delete(
    req: FastifyRequest<{ Querystring: DeleteBookDto }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const parsedQuery = DeleteBookSchema.safeParse(req.query);

    if (parsedQuery.error) {
      throw new ZodValidationException(parsedQuery.error.errors);
    }

    await this.deleteBookUseCase.execute(parsedQuery.data.id);
    return HttpPresenter.ok(reply, "Book deleted successfully");
  }

  async findAllAvailable(req: FastifyRequest, reply: FastifyReply) {
    const data = await this.finAllAvailableBooksUseCase.execute();
    return HttpPresenter.ok(
      reply,
      "Available books listed successfully!",
      data
    );
  }
}
