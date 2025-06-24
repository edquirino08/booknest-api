import { FastifyInstance } from "fastify";

export function bookRoutes(fastify: FastifyInstance) {
  const container = fastify.container();
  const bookController = container.resolve("bookController");
  const routeConfig = {
    config: {
      role: "ADMIN",
    },
  };
  fastify.post("/", routeConfig, bookController.register.bind(bookController));
  fastify.get("/", bookController.findAll.bind(bookController));
  fastify.put("/", routeConfig, bookController.update.bind(bookController));
  fastify.delete("/", routeConfig, bookController.delete.bind(bookController));
}
