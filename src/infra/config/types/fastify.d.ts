import "fastify";
import { AwilixContainer } from "awilix";

declare module "fastify" {
  interface FastifyInstance {
    container: () => AwilixContainer;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}
