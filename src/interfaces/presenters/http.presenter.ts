import { FastifyReply } from "fastify";

export class HttpPresenter {
  static ok<T>(reply: FastifyReply, message: string, data?: T): FastifyReply {
    return reply.code(200).send({
      message: message,
      data: data,
    });
  }

  static error(
    reply: FastifyReply,
    message: string,
    code?: number
  ): FastifyReply {
    if (code) {
      return reply.code(code).send({
        message: message,
      });
    }
    // Default to 400 Bad Request if no code is provided
    return reply.code(400).send({
      message: message,
    });
  }
}
