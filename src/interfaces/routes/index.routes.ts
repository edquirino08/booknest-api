import { FastifyInstance } from "fastify";
import { userRoutes } from "./user.routes";
import { bookRoutes } from "./book.routes";
import { bookRentalRoutes } from "./book-rental.route";

export async function routes(fastify: FastifyInstance) {
  await fastify.register(userRoutes, {
    prefix: "/user",
  });
  await fastify.register(bookRoutes, {
    prefix: "/book",
  });
  await fastify.register(bookRentalRoutes, {
    prefix: "/book-rental",
  });
}
