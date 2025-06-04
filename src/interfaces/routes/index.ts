import { FastifyInstance } from "fastify";
import { userRoutes } from "./user-routes";

export async function routes(fastify: FastifyInstance) {
  await fastify.register(userRoutes, {
    prefix: "/users",
  });
}
