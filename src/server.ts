import Fastify from "fastify";

const fastify = Fastify({logger: true});

const start = async () => {
    await fastify.listen({port: 3000});
}

start();