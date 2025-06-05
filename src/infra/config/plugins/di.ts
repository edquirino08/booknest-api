import * as awilix from "awilix";
import Joi from "joi";
import _ from "lodash";
import { fileURLToPath } from "url";
import { dirname } from "path";
import userController from "../../../interfaces/user.controller";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const container = awilix.createContainer();

export default function DI(options: any) {
  container.register({
    Joi: awilix.asValue(Joi),
    _: awilix.asValue(_),
    userController: awilix.asValue(userController),
  });
  const _container = () => container;

  return {
    _container,
  };
}
