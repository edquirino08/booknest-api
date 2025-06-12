import { FastifyInstance } from "fastify";
import { userRoutes } from "./user.routes";
import { bookRoutes } from "./book.routes";

export async function routes(fastify: FastifyInstance) {
  await fastify.register(userRoutes, {
    prefix: "/user",
  });
  await fastify.register(bookRoutes, {
    prefix: "/book",
  });
}
