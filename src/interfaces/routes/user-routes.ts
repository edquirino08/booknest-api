import { FastifyInstance } from "fastify";

export async function userRoutes(fastify: FastifyInstance) {
  const container = fastify.container();
  const userController = container.resolve("userController");
  fastify.get("/", userController);
}
