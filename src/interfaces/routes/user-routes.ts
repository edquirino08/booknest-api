import userController from "../user.controller";
import { FastifyInstance } from "fastify";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/", userController.getUser);
}
