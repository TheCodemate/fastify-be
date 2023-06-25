import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import { userRoutes } from "./modules/users/user.route";
import { productRoutes } from "./modules/product/product.route";
import { userSchemas } from "./modules/users/user.schema";
import { productSchemas } from "./modules/product/product.schema";

const server = Fastify();

server.register(fjwt, {
  secret:
    "sdokjfhasjnfqw0ieur405983405u33453l4j5kj3k4jckl34j5lk3jc4lk53jc4kl3potc43",
});

server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  }
);

const main = async () => {
  for (const schema of [...userSchemas, ...productSchemas]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });
  server.register(productRoutes, { prefix: "api/products" });
  try {
    await server.listen({ port: 3000 });
    console.log("Server ready at port http://localhost:3000");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
