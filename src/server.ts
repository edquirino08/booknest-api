import fastify from "fastify";
import { routes } from "./interfaces/routes";
import DI from "./infra/config/plugins/di";

const server = fastify({
  logger: true,
});

server.register(routes);

function initAwilix() {
  const di = DI({});
  const _container = di._container();
  server.decorate("container", () => _container);
  const { userController } = _container.cradle;
  userController.getUser();
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

await startServer();
