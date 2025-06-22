import fastify from "fastify";
import { routes } from "./interfaces/routes/index.routes";
import container from "./infra/config/plugins/di";
import { exceptionHandler } from "./interfaces/exceptions/exception-handler";
import { setupJwt } from "./infra/config/plugins/jwt";
import { pinoConfig } from "./infra/observability/pino.logger";
import requestLogHandler from "./infra/config/hooks/request-hook.logger";
import roles from "./infra/config/hooks/roles.hook";

const server = fastify({
  logger: pinoConfig,
});

setupJwt(server);
roles(server);
requestLogHandler(server);

server.setErrorHandler(exceptionHandler);

server.register(routes);

function initAwilix() {
  server.decorate("container", () => container);
}

initAwilix();

async function startServer() {
  try {
    await server.listen({ port: 3000 });
    console.log(`🚀 Server is running on http://localhost:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

startServer();
