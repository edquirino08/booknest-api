import pino, { Logger } from "pino";

export const pinoConfig = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  level: "info",
};

const logger: Logger = pino(pinoConfig);

export default logger;
