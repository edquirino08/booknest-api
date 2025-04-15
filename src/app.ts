import { FastifyInstance } from "fastify";
import { bookRoute } from "./interfaces/books/books.routes";
import { fastifyAwilixPlugin } from "@fastify/awilix";
import container from "./infra/containers/index.container";

export default class Application {
  async setup(fastify: FastifyInstance) {
    fastify.register(fastifyAwilixPlugin, {
      disposeOnClose: true,
      disposeOnResponse: false,
      container,
    });

    fastify.register(bookRoute, { prefix: "/books" });
  }
}
