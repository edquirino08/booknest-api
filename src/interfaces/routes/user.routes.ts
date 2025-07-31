import { FastifyInstance } from "fastify";
import { LoginSchema } from "../dto/user/user-login.dto";
import { zodToJsonSchema } from "zod-to-json-schema";

export async function userRoutes(fastify: FastifyInstance) {
  const container = fastify.container();
  const userController = container.resolve("userController");
  const loginSchemaJson = zodToJsonSchema(LoginSchema);

  fastify.post(
    "/",
    {
      schema: {
        body: loginSchemaJson,

        response: {
          200: {
            type: "object",
            properties: {
              jwt: { type: "string" },
            },
          },
        },
        tags: ["User"],
        summary: "Cria um novo usuário",
      },
    },
    userController.createUser.bind(userController)
  );
  fastify.post("/login", userController.login.bind(userController));
}
