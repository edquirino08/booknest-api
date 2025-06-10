import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserDtoSchema } from "./dto/create-user.dto";
import CreateUserUseCase from "../../application/user/create-user.usecase";
import { ZodValidationException } from "../exceptions/exception-handler";
import { HttpPresenter } from "../presenters/http.presenter";

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const parseResult = CreateUserDtoSchema.safeParse(request.body);

    if (!parseResult.success) {
      throw new ZodValidationException(parseResult.error.errors);
    }

    const data = await this.createUserUseCase.execute(parseResult.data);

    return HttpPresenter.ok(reply, "User created successfully", data);
  }
}
