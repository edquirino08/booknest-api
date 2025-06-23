import { FastifyInstance } from "fastify";

const errorHook = (fastify: FastifyInstance) => {
  fastify.addHook(`onError`, async (request, reply, error) => {
    if (error.code == `500`) {
      request.log.error(`Internal Server error: ${error.message}`);
    } else {
      request.log.warn(`${error.name}: ${error.message}`);
    }
  });
};

export default errorHook;
