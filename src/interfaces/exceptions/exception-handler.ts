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

export class JwtException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JwtException";
  }
}

export class ResourceAuthorizationException extends Error {
  constructor() {
    super("Access denied.");
    this.name = "ResourceAuthorizationException";
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

  if (error instanceof JwtException) {
    return HttpPresenter.error(reply, error.message, 401);
  }

  if (error instanceof ResourceAuthorizationException) {
    return HttpPresenter.error(reply, error.message, 401);
  }

  console.error(error.message);
  return reply.status(500).send({
    message: "Internal Server Error",
  });
};
