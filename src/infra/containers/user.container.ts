import { asClass, createContainer } from "awilix";
import { UserRepository } from "../repositories/user.repository";

export const userContainer = createContainer({});

userContainer.register({
  userRepository: asClass(UserRepository).singleton(),
});
