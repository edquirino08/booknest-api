import { asClass, createContainer } from "awilix";
import { userContainer } from "./user.container";
import Application from "../../app";

const container = createContainer({});

container.register({
  application: asClass(Application).singleton(),
  ...userContainer.registrations,
});

export default container;
