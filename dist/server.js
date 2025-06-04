import fastify from "fastify";
const server = fastify({
    logger: true,
});
async function startServer() {
    try {
        await server.listen({ port: 3000 });
        console.log(`🚀 Server is running on http://localhost:3000`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}
await startServer();
