import { FastifyInstance } from "fastify";
import { handleGetBooks } from "./books.controller";

export const bookRoute = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.get("/", handleGetBooks);
};
