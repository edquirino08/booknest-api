import { FastifyInstance } from "fastify";
import {
  LoginSchema,
  UserLoginResponseDtoSchema,
} from "../dto/user/user-login.dto";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  CreateUserDtoSchema,
  CreateUserResponseDtoSchema,
} from "../dto/user/create-user.dto";

export async function userRoutes(fastify: FastifyInstance) {
  const container = fastify.container();
  const userController = container.resolve("userController");
  fastify.post(
    "/",
    {
      schema: {
        body: zodToJsonSchema(CreateUserDtoSchema),
        response: {
          200: zodToJsonSchema(CreateUserResponseDtoSchema),
        },
        tags: ["User"],
        summary: "Create e new User",
      },
    },
    userController.createUser.bind(userController)
  );

  fastify.post(
    "/login",
    {
      schema: {
        body: zodToJsonSchema(LoginSchema),
        tags: ["User"],
        summary: "User login",
        response: {
          200: zodToJsonSchema(UserLoginResponseDtoSchema),
        },
      },
    },
    userController.login.bind(userController)
  );
}
