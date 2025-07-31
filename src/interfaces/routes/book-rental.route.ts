import { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import { RegisterRentalSchema } from "../dto/book-rental/register-rental.dto";
import { BookReturnSchema } from "../dto/book-rental/book-return.dto";

export function bookRentalRoutes(fastify: FastifyInstance) {
  const container = fastify.container();
  const rentalController = container.resolve("bookRentalController");

  fastify.post(
    "/",
    {
      config: {
        role: "ADMIN",
      },
      schema: {
        summary: "Register a new book rental",
        body: zodToJsonSchema(RegisterRentalSchema),
        response: {
          200: zodToJsonSchema(RegisterRentalSchema),
        },
        tags: ["Book Rental"],
      },
    },
    rentalController.register.bind(rentalController)
  );

  fastify.post(
    "/return",
    {
      config: {
        role: "ADMIN",
      },
      schema: {
        summary: "Return a rented book",
        body: zodToJsonSchema(BookReturnSchema),
        response: {
          200: {
            message: "Rental returned successfully!",
          },
        },
        tags: ["Book Rental"],
      },
    },
    rentalController.bookReturn.bind(rentalController)
  );
}
