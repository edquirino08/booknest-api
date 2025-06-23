import roles from "./roles.hook";
import { setupJwt } from "../plugins/jwt";
import requestLogHandler from "./request-hook.logger";
import { FastifyInstance } from "fastify";
import errorHook from "./error.hook";

const setupHooks = (fastify: FastifyInstance) => {
  setupJwt(fastify);
  roles(fastify);
  requestLogHandler(fastify);
  errorHook(fastify);
};

export default setupHooks;
