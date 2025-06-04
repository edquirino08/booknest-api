import { UserRepository } from "../../domain/user/user.repository.interface";

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: any): Promise<any> {
    // Validate user data here if necessary
    return this.userRepository.save(user);
  }
}
