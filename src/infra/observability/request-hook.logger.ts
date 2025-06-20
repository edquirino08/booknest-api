import { FastifyInstance } from "fastify";

const preHandler = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", async (request, reply) => {
    const { url } = request;
    if (!["/user/login", "/user"].includes(url) && request.body) {
      request.log.info({ body: request.body });
    }
  });
};

export default preHandler;
