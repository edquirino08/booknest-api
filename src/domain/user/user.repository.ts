import { User } from "./user.entity";

export interface UserRepository {
  create(user: User): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailOrUsername(email: string, username: string): Promise<User | null>;
  findByEmailAndPassword(email: string, password: string): Promise<User | null>;
}
