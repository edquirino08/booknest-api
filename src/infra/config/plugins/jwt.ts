import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { JwtException } from "../../../interfaces/exceptions/exception-handler";

export const setupJwt = (fastify: FastifyInstance) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET not defined in environment variables.");
  }

  fastify.register(fastifyJwt, {
    secret,
  });

  fastify.addHook(
    "onRequest",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const publicRoutes = ["/user", "/user/login"];
      if (
        publicRoutes.includes(request.url) ||
        request.url.startsWith("/docs")
      ) {
        return;
      }
      try {
        await request.jwtVerify();
      } catch (error) {
        if (error instanceof Error) {
          throw new JwtException(error.message);
        } else {
          throw new JwtException("Unknown JWT error");
        }
      }
    }
  );
};
