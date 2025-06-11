import { PrismaClient } from "@prisma/client";
import { User, toUser } from "../../../domain/user/user.entity";
import { UserRepository } from "../../../domain/user/user.repository";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        username: user.username,
        name: user.name,
        email: user.email,
        password: user.password,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
        deleted_at: user.deletedAt,
      },
    });
    return toUser(createdUser);
  }

  async findByUsername(username: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return data ? toUser(data) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return data ? toUser(data) : null;
  }

  async findByEmailOrUsername(
    email: string,
    username: string
  ): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
        username: username,
      },
    });
  }

  async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | null> {
    const data = await this.prisma.user.findFirst({
      where: {
        AND: [{ email: email }, { password: password }],
      },
    });
    return data ? toUser(data) : null;
  }
}
