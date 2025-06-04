import { Service } from "fastify-decorators";
import { User } from "../../domain/user/user.entity";
import { UserRepository } from "../../domain/user/user.repository.interface";

@Service()
export class UserPrismaRepository implements UserRepository{
    save(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
}