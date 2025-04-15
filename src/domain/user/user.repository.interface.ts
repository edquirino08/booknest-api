import { User } from "../user/user.entity";

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
}
