import Fastify from "fastify";
import { application } from "./app";
import { setupJwt } from "./infra/http/security.configuration";
import dotenv from "dotenv";

const fastify = Fastify({ logger: true });
dotenv.config();

const start = async () => {
  setupJwt(fastify);
  fastify.register(application);
  await fastify.listen({ port: 3000, host: "0.0.0.0" });
};

start();
