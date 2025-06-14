import { FastifyInstance } from "fastify";

export function bookRoutes(fastify: FastifyInstance) {
  const container = fastify.container();
  const authenticate = { preHandler: fastify.authenticate };
  const bookController = container.resolve("bookController");
  fastify.post("/", authenticate, bookController.register.bind(bookController));
  fastify.get("/", authenticate, bookController.findAll.bind(bookController));
}
