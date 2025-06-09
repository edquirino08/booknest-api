import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/user/user.entity";
import { UserRepository } from "../../../domain/user/user.repository";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
        deleted_at: user.deletedAt,
      },
    });
    return new User({
      id: createdUser.id,
      name: createdUser.name,
      username: user.username,
      email: createdUser.email,
      password: createdUser.password,
      createdAt: createdUser.created_at,
      updatedAt: createdUser.updated_at,
      deletedAt: createdUser.deleted_at,
    });
  }
}
