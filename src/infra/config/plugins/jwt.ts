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

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
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
