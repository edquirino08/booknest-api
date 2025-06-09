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
    message: object | string,
    code?: number
  ): FastifyReply {
    if (code) {
      return reply
        .code(code)
        .send(
          typeof message === "object"
            ? { message: "Validation error", errors: message }
            : { message }
        );
    }
    return reply.code(400).send({ message });
  }
}
