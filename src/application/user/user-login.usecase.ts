import { FastifyRequest } from "fastify";
import { UserRepository } from "../../domain/user/user.repository";
import { BadRequestException } from "../../interfaces/exceptions/exception-handler";
import {
  LoginRequestDto,
  LoginResponseDto,
} from "../../interfaces/dto/user/user-login.dto";
import bcrypt from "bcrypt";
import { Loggable } from "../../infra/observability/loggable";

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  @Loggable()
  async execute(
    fastifyRequest: FastifyRequest,
    requestDto: LoginRequestDto
  ): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(requestDto.email);

    if (!user)
      throw new BadRequestException(
        `Dont exists any user with requested email: ${requestDto.email}`
      );

    const passwordMatches = await bcrypt.compare(
      requestDto.password,
      user.password
    );

    if (!passwordMatches) {
      throw new BadRequestException("Incorrect password");
    }

    const payload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    const token = fastifyRequest.server.jwt.sign(payload, {
      expiresIn: "1d",
    });

    return {
      jwt: token,
    } as LoginResponseDto;
  }
}
