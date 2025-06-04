import { Controller, POST } from "fastify-decorators";
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserDto } from "./dto/create-user.dto";
import { RegisterUserUseCase } from "../../application/user/save-user.use-case";
import { HttpPresenter } from "../presenters/http.presenter";

@Controller({ route: "/user" })
export default class UserController {
  constructor(private readonly saveUserUseCase: RegisterUserUseCase) {
    this.saveUserUseCase = saveUserUseCase;
  }

  @POST("/")
  async getUser(
    req: FastifyRequest<{ Body: CreateUserDto }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    console.log(req.body);

    return HttpPresenter.ok(reply, "User created successfully");
  }
}
