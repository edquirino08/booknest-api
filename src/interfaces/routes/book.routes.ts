import { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  RegisterBookResponseSchema,
  RegisterBookSchema,
} from "../dto/book/register-book.dto";
import { GenericFilteringAndPaginationSchema } from "../dto/utils/generic-filtering-pagination.dto";
import {
  BookResponseSchema,
  ListBookResponseDtoSchema,
  ListBookResponseSchema,
} from "../dto/book/list-books.dto";
import { UpdateBookSchema } from "../dto/book/update-book.dto";
import { DeleteBookSchema } from "../dto/book/delete-book.dto";

export function bookRoutes(fastify: FastifyInstance) {
  const container = fastify.container();
  const bookController = container.resolve("bookController");
  const routeConfig = {
    config: {
      role: "ADMIN",
    },
  };

  const tags = ["Books"];

  fastify.post(
    "/",
    {
      ...routeConfig,
      schema: {
        summary: "Register a new book",
        body: zodToJsonSchema(RegisterBookSchema),
        response: {
          200: zodToJsonSchema(RegisterBookResponseSchema),
        },
        tags,
      },
    },
    bookController.register.bind(bookController)
  );

  fastify.get(
    "/",
    {
      schema: {
        summary: "List all books with pagination and filtering",
        querystring: zodToJsonSchema(GenericFilteringAndPaginationSchema),
        response: {
          200: zodToJsonSchema(ListBookResponseSchema),
        },
        tags,
      },
    },
    bookController.findAll.bind(bookController)
  );

  fastify.put(
    "/",
    {
      ...routeConfig,
      schema: {
        summary: "Update an existing book",
        body: zodToJsonSchema(UpdateBookSchema),
        response: {
          200: zodToJsonSchema(BookResponseSchema),
        },
        tags,
      },
    },
    bookController.update.bind(bookController)
  );

  fastify.delete(
    "/",
    {
      ...routeConfig,
      schema: {
        summary: "Delete a book by ID",
        querystring: zodToJsonSchema(DeleteBookSchema),
        response: {
          200: {
            message: "Book deleted successfully",
          },
        },
        tags,
      },
    },
    bookController.delete.bind(bookController)
  );

  fastify.get(
    "/available",
    {
      ...routeConfig,
      schema: {
        summary: "List available books",
        querystring: zodToJsonSchema(ListBookResponseDtoSchema),
        response: {
          200: {
            message: "Book deleted successfully",
          },
        },
        tags,
      },
    },
    bookController.findAllAvailable.bind(bookController)
  );
}
