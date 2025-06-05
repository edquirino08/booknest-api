import * as awilix from "awilix";
import Joi from "joi";
import _ from "lodash";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const container = awilix.createContainer();

export default function DI(options: any) {
  container.register({
    Joi: awilix.asValue(Joi),
    _: awilix.asValue(_),
  });

  container.loadModules([], {
    cwd: __dirname,
    formatName: "camelCase",
    resolverOptions: {
      register: awilix.asFunction,
      lifetime: awilix.Lifetime.SINGLETON,
    },
  });

  const _container = () => container;

  return {
    _container,
  };
}
