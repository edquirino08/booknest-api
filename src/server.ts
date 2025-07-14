import fastify from "fastify";
import { routes } from "./interfaces/routes/index.routes";
import container from "./infra/config/plugins/di";
import { exceptionHandler } from "./interfaces/exceptions/exception-handler";
import { pinoConfig } from "./infra/observability/pino.logger";
import setupHooks from "./infra/config/hooks/index.hooks";

const server = fastify({
  logger: pinoConfig,
});

setupHooks(server);

server.setErrorHandler(exceptionHandler);

server.register(routes);

function initAwilix() {
  server.decorate("container", () => container);
}

initAwilix();

async function startServer() {
  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log(`🚀 Server is running on http://localhost:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

startServer();
