import { FastifyReply, FastifyRequest } from "fastify";
import { HttpPresenter } from "../presenters/http.presenter";

export class BadRequestException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestException";
  }
}

export class ZodValidationException extends Error {
  public errors: any;
  constructor(errors: object | string) {
    super(typeof errors === "string" ? errors : JSON.stringify(errors));
    this.name = "ZodValidationException";
    this.errors = errors;
  }
}

export const exceptionHandler = (
  error: any,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof BadRequestException) {
    return HttpPresenter.error(reply, error.message, 400);
  }

  if (error instanceof ZodValidationException) {
    return HttpPresenter.error(reply, error.errors, 422);
  }

  return reply.status(500).send({
    message: "Internal Server Error",
    error: error.message,
  });
};
