import { FastifyInstance } from "fastify";
import { createProductHandler, getProductsHandler } from "./product.controller";
import { $ref } from "./product.schema";

export const productRoutes = async (server: FastifyInstance) => {
  server.get(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        response: { 200: $ref("ProductsResponseSchema") },
      },
    },
    getProductsHandler
  );
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("CreateProductSchema"),
        response: { 201: $ref("ProductResponseSchema") },
      },
    },
    createProductHandler
  );
};
