import * as awilix from "awilix";
import Joi from "joi";
import _ from "lodash";
import { UserController } from "../../../interfaces/user/user.controller";
import CreateUserUseCase from "../../../application/user/create-user.usecase";
import { UserRepositoryImpl } from "../../database/repositories/user.repository.impl";
import prisma from "../../database/prisma.client";
import { LoginUseCase } from "../../../application/user/user-login.usecase";
import { BookController } from "../../../interfaces/book/book.controller";
import RegisterBookUsecase from "../../../application/book/register-book.usecase";
import { BookRepositoryImpl } from "../../database/repositories/book.repository.impl";
import { ListBookUseCase } from "../../../application/book/list-book.usecase";
import { FindAllBooksUseCase } from "../../../application/book/find-all-books.usecase";

const container = awilix.createContainer({
  injectionMode: "CLASSIC",
});

container.register({
  Joi: awilix.asValue(Joi),
  _: awilix.asValue(_),
  userController: awilix.asClass(UserController).singleton(),
  createUserUseCase: awilix.asClass(CreateUserUseCase).singleton(),
  userRepository: awilix.asClass(UserRepositoryImpl).singleton(),
  loginUseCase: awilix.asClass(LoginUseCase).singleton(),
  bookController: awilix.asClass(BookController).singleton(),
  registerBookUseCase: awilix.asClass(RegisterBookUsecase).singleton(),
  listBookUseCase: awilix.asClass(ListBookUseCase).singleton(),
  findAllBooksUseCase: awilix.asClass(FindAllBooksUseCase).singleton(),
  bookRepository: awilix.asClass(BookRepositoryImpl).singleton(),
  prisma: awilix.asValue(prisma),
});

export default container;
