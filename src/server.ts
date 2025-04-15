import Fastify from "fastify";
import { bootstrap } from "fastify-decorators";

const app = Fastify();

app.register(bootstrap, {
  directory: __dirname + "/controllers", // Adjust the path to your controllers directory
  mask: /\.controller\./, // Adjust the file mask if needed
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
