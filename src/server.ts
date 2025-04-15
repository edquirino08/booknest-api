import Fastify from "fastify";
import Application from "./app";
import { setupJwt } from "./infra/http/security/security.configuration";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({ logger: true });
const application = new Application();

async function start() {
  setupJwt(fastify);
  fastify.register(application.setup.bind(application));
  await fastify.listen({ port: 3000, host: "0.0.0.0" });
}

start();
