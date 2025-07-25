# booknest-api

Booknest API is a scalable, modern RESTful API for managing books, built with Node.js, TypeScript, Fastify, Prisma ORM, JWT authentication, and dependency injection via Awilix.

## Features

- 📚 CRUD for books (register, update, delete, list)
- 🔒 JWT authentication and role-based authorization
- 🧩 Dependency Injection with Awilix
- 🗃️ Filtering, pagination, and sorting for book listings
- 🛡️ Validation with Zod
- 📝 API documentation (Swagger/OpenAPI recommended)
- 🧪 Unit and integration tests (Jest recommended)
- 🚀 Ready for Docker and CI/CD

## Technologies

- [Fastify](https://www.fastify.io/) – Fast and low overhead web framework
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [Prisma](https://www.prisma.io/) – ORM for database access
- [Awilix](https://github.com/jeffijoe/awilix) – Dependency Injection
- [Zod](https://zod.dev/) – Schema validation
- [JWT](https://jwt.io/) – Authentication
- [Pino](https://getpino.io/) – Logging

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL (or other supported DB)
- Docker (optional)

### Installation

```bash
git clone https://github.com/edquirino08/booknest-api.git
cd booknest-api
npm install
```

### Environment

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/booknest
JWT_SECRET=your_jwt_secret
```

### Database

Run migrations:

```bash
npx prisma migrate dev
```

### Running

```bash
npm run dev
```

API will be available at [http://localhost:3000](http://localhost:3000)

### Testing

```bash
npm test
```

## API Endpoints

- `POST /book` – Register a new book
- `GET /book` – List books (supports filtering, pagination, sorting)
- `PUT /book` – Update book
- `DELETE /book` – Delete book
- `GET /book/available` – List available books
- `POST /auth/login` – Login and get JWT

## Example Request

```bash
curl -X GET 'http://localhost:3000/book?sort=id,desc&sort=name,asc&page=1&size=10' \
  --header 'Authorization: Bearer <your-jwt-token>'
```

## Project Structure

```
src/
  application/    # Use cases
  domain/         # Entities and repositories
  infra/          # Database, DI, logging, repositories implementation
  interfaces/     # Controllers, routes, DTOs, exceptions
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

MIT

---

**Booknest API** – Modern, scalable, and production-ready book management
