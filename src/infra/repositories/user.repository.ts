import { User, UserProps } from "../../domain/user/user.entity";
import { UserRepositoryInterface } from "../../domain/user/user.repository.interface";
import { prisma } from "../prisma/client";

export class UserRepository implements UserRepositoryInterface {
  async save(user: User): Promise<User> {
    const createdUser = prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    }) as UserProps;
    return new User(createdUser);
  }
}
