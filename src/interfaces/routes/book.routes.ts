import { FastifyInstance } from "fastify";

export function bookRoutes(fastify: FastifyInstance) {
  const container = fastify.container();
  const bookController = container.resolve("bookController");
  fastify.post("/", bookController.register.bind(bookController));
  fastify.get("/", bookController.findAll.bind(bookController));
}
