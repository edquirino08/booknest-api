import { createContainer, asClass } from "awilix";

export const container = createContainer({
  injectionMode: "CLASSIC", // ou 'PROXY' se quiser auto-inject
});

container.register({});
