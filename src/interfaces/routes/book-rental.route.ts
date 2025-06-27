import { FastifyInstance } from "fastify";

export function bookRentalRoutes(fastify: FastifyInstance) {
  const container = fastify.container();
  const rentalController = container.resolve("bookRentalController");
  const routeConfig = {
    config: {
      role: "ADMIN",
    },
  };
  fastify.post(
    "/",
    routeConfig,
    rentalController.register.bind(rentalController)
  );
}
