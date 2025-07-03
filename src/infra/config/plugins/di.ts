import * as awilix from "awilix";
import Joi from "joi";
import _ from "lodash";
import { UserController } from "../../../interfaces/controller/user.controller";
import CreateUserUseCase from "../../../application/user/create-user.usecase";
import { UserRepositoryImpl } from "../../database/repositories/user.repository.impl";
import prisma from "../../database/prisma.client";
import { LoginUseCase } from "../../../application/user/user-login.usecase";
import { BookController } from "../../../interfaces/controller/book.controller";
import RegisterBookUsecase from "../../../application/book/register-book.usecase";
import { BookRepositoryImpl } from "../../database/repositories/book.repository.impl";
import { FindAllBooksUseCase } from "../../../application/book/find-all-books.usecase";
import { UpdateBookUseCase } from "../../../application/book/update-book.usecase";
import { DeleteBookUseCase } from "../../../application/book/delete-book.usecase";
import { FindBookByIdUseCase } from "../../../application/book/find-book-by-id.usecase";
import { AvailabilityForRentalUseCase } from "../../../application/book-rental/availability-for-rental.usecase";
import { RegisterRentalUseCase } from "../../../application/book-rental/register-rental.usecase";
import { BookRentalController } from "../../../interfaces/controller/book-rental.controller";
import { BookRentalRepositoryImpl } from "../../database/repositories/book-rental.repository.impl";
import { FinAllAvailableBooksUseCase } from "../../../application/book/find-all-available-book.usecase";
import { BookReturnUseCase } from "../../../application/book-rental/book-return.usecase";

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
  findAllBooksUseCase: awilix.asClass(FindAllBooksUseCase).singleton(),
  finAllAvailableBooksUseCase: awilix
    .asClass(FinAllAvailableBooksUseCase)
    .singleton(),
  bookRepository: awilix.asClass(BookRepositoryImpl).singleton(),
  updateBookUseCase: awilix.asClass(UpdateBookUseCase).singleton(),
  deleteBookUseCase: awilix.asClass(DeleteBookUseCase).singleton(),
  bookRentalRepository: awilix.asClass(BookRentalRepositoryImpl).singleton(),
  findBookByIdUseCase: awilix.asClass(FindBookByIdUseCase).singleton(),
  availabilityForRentalUseCase: awilix
    .asClass(AvailabilityForRentalUseCase)
    .singleton(),
  registerRentalUseCase: awilix.asClass(RegisterRentalUseCase).singleton(),
  bookReturnUseCase: awilix.asClass(BookReturnUseCase).singleton(),
  bookRentalController: awilix.asClass(BookRentalController).singleton(),
  prisma: awilix.asValue(prisma),
});

export default container;
