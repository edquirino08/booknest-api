import { CreateUserDto } from "../../interfaces/user/dto/create-user.dto";
import { User, UserProps } from "../../domain/user/user.entity";
import { UserRepository } from "../../domain/user/user.repository";

export default class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(requestDto: CreateUserDto): Promise<User> {
    const userProps: UserProps = {
      id: 0,
      name: requestDto.name,
      email: requestDto.email,
      username: requestDto.username,
      password: requestDto.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    return await this.userRepository.create(new User(userProps));
  }
}
