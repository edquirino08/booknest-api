import Fastify from "fastify";
import { application } from "./app";

const fastify = Fastify({logger: true});

const start = async () => {
  fastify.register(application);
  await fastify.listen({port: 3000});
};

start();