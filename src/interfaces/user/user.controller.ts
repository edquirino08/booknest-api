import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserDtoSchema } from "./dto/create-user.dto";
import CreateUserUseCase from "../../application/user/create-user.usecase";
import { ZodValidationException } from "../exceptions/exception-handler";
import { HttpPresenter } from "../presenters/http.presenter";
import { LoginSchema } from "./dto/user-login.dto";
import { LoginUseCase } from "../../application/user/user-login.usecase";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase
  ) {}

  async createUser(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const parseResult = CreateUserDtoSchema.safeParse(request.body);

    if (!parseResult.success) {
      throw new ZodValidationException(parseResult.error.errors);
    }

    const data = await this.createUserUseCase.execute(parseResult.data);

    return HttpPresenter.ok(reply, "Login Success", data);
  }

  async login(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const parseResult = LoginSchema.safeParse(request.body);

    if (!parseResult.success) {
      throw new ZodValidationException(parseResult.error.errors);
    }

    const data = await this.loginUseCase.execute(request, parseResult.data);

    return HttpPresenter.ok(reply, "User created successfully", data);
  }
}
