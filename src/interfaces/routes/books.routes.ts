import { FastifyInstance } from "fastify";
import { handleGetBooks } from "../controllers/books.controller";

export const bookRoute = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.get("/", handleGetBooks);
};