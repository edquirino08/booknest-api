import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserDtoSchema } from "./dto/create-user.dto";
import CreateUserUseCase from "../../application/user/create-user.usecase";

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(request: FastifyRequest, reply: FastifyReply): Promise<any> {
    const parseResult = CreateUserDtoSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        message: "Invalid request data",
        errors: parseResult.error.errors,
      });
    }
    reply.status(201).send({
      message: "User created successfully",
      data: await this.createUserUseCase.execute(parseResult.data),
    });
  }
}
