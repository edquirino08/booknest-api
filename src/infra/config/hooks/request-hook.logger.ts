import { FastifyInstance } from "fastify";

const requestLogHandler = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", async (request) => {
    const { url } = request;
    if (!["/user/login", "/user"].includes(url) && request.body) {
      request.log.info({ body: request.body });
    }
  });
};

export default requestLogHandler;
