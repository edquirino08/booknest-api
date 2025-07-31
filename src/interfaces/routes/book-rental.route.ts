import { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import { RegisterRentalSchema } from "../dto/book-rental/register-rental.dto";

export function bookRentalRoutes(fastify: FastifyInstance) {
  const container = fastify.container();
  const rentalController = container.resolve("bookRentalController");

  const config = {
    role: "ADMIN",
    schema: {
      body: zodToJsonSchema(RegisterRentalSchema),
      response: {
        200: zodToJsonSchema(RegisterRentalSchema),
      },
    },
  };

  fastify.post("/", config, rentalController.register.bind(rentalController));
  fastify.post(
    "/return",
    config,
    rentalController.bookReturn.bind(rentalController)
  );
}
