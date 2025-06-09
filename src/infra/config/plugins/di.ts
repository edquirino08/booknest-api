import * as awilix from "awilix";
import Joi from "joi";
import _ from "lodash";
import { UserController } from "../../../interfaces/user/user.controller";
import CreateUserUseCase from "../../../application/user/create-user.usecase";
import { UserRepositoryImpl } from "../../database/repositories/user.repository.impl";
import prisma from "../../database/prisma.client";

const container = awilix.createContainer({
  injectionMode: "CLASSIC",
});

container.register({
  Joi: awilix.asValue(Joi),
  _: awilix.asValue(_),
  userController: awilix.asClass(UserController).singleton(),
  createUserUseCase: awilix.asClass(CreateUserUseCase).singleton(),
  userRepository: awilix.asClass(UserRepositoryImpl).singleton(),
  prisma: awilix.asValue(prisma),
});

export default container;
