import fastifyJwt from "fastify-jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function setupJwt(server: FastifyInstance) {
  server.register(fastifyJwt, {
    secret: process.env.SECRET_KEY ?? "supersecret",
    sign: {
      expiresIn: "1h",
    },
  });

  server.addHook(
    "onRequest",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const isPublic = ["/login", "/register"].includes(
        request.originalUrl || ""
      );

      if (!isPublic) {
        try {
          await request.jwtVerify();
        } catch (err) {
          return reply.status(401).send({ message: "Invalid or missing JWT" });
        }
      }
    }
  );
}
