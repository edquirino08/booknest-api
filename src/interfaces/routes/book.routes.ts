import { FastifyInstance } from "fastify";

export function bookRoutes(fastify: FastifyInstance) {
  const container = fastify.container();
  const bookController = container.resolve("bookController");
  fastify.post(
    "/",
    { preHandler: fastify.authenticate },
    bookController.register.bind(bookController)
  );
}
