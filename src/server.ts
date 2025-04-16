import fastify from "fastify";
import { bootstrap } from "fastify-decorators";

async function buildServer() {
  const app = fastify({ logger: true });

  app.register(bootstrap, {
    directory: `${__dirname}/interfaces`,
    mask: /\.controller\.[tj]s$/,
  });

  return app;
}

async function start() {
  const app = await buildServer();
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server rodando em http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
