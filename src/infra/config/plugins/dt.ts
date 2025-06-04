import { fastifyAwilixPlugin } from "fastify-awilix";
import { container } from "../container";

export const diPlugin = async (fastify: any) => {
  fastify.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
    container,
  });
};
