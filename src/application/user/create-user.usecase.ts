import {
  CreateUserDto,
  CreateUserResponseDto,
} from "../../interfaces/dto/user/create-user.dto";
import { toUser } from "../../domain/user/user.entity";
import { UserRepository } from "../../domain/user/user.repository";
import { BadRequestException } from "../../interfaces/exceptions/exception-handler";
import bcrypt from "bcrypt";

export default class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(requestDto: CreateUserDto): Promise<CreateUserResponseDto> {
    await this.validateRequestParams(requestDto.email, requestDto.username);

    const criptedPassword = await bcrypt.hash(requestDto.password, 10);

    requestDto.password = criptedPassword;

    const user = toUser(requestDto);

    const createdUser = await this.userRepository.create(user);

    return new CreateUserResponseDto(createdUser);
  }

  private async validateRequestParams(email: string, username: string) {
    const userByEmail = await this.userRepository.findByEmail(email);
    const userByUsername = await this.userRepository.findByUsername(username);

    if (userByEmail) {
      throw new BadRequestException(`Email '${email}' já está cadastrado`);
    }
    if (userByUsername) {
      throw new BadRequestException(
        `Username '${username}' já está cadastrado`
      );
    }
  }
}
