import { FastifyInstance } from "fastify";
import { bookRoute } from "./interfaces/routes/books.routes";

export const application = async (fastify: FastifyInstance) => {
  fastify.register(bookRoute, {prefix: "/books"});
};