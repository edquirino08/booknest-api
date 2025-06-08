import { getUserUseCase } from "../../application/user/get-user.usecase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUser(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  const data = getUserUseCase.execute();
  return reply.send({
    message: "User retrieved successfully",
    data,
  });
}
