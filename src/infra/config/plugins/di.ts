import * as awilix from "awilix";
import Joi from "joi";
import _ from "lodash";
import { getUserUseCase } from "../../../application/user/get-user.usecase";
import { getUser } from "../../../interfaces/user.controller";

const container = awilix.createContainer({
  injectionMode: "PROXY", // permite injeção automática por nome
});

container.register({
  Joi: awilix.asValue(Joi),
  _: awilix.asValue(_),
  getUserUseCase: awilix.asValue(getUserUseCase),
  userController: awilix.asValue(getUser),
});

export default container;
