import { fastifyAwilixPlugin } from "@fastify/awilix";
import { FastifyInstance } from "fastify";

export const diPlugin = async (fastify: FastifyInstance) => {
  fastify.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
  });

  fastify.after(() => {
    // Register your services here
    // Example: fastify.awilixContainer.register({
    //   myService: asClass(MyService).singleton(),
    // });
  });
};
