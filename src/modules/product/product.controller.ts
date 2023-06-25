import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, getProducts } from "./product.services";
import { CreateProductType } from "./product.schema";

export const getProductsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const products = await getProducts();
    return reply.code(200).send(products);
  } catch (error) {
    return reply.code(500).send(error);
  }
};

export const createProductHandler = async (
  request: FastifyRequest<{ Body: CreateProductType }>,
  reply: FastifyReply
) => {
  const body = request.body;

  try {
    const product = await createProduct({ ...body, ownerId: request.user.id });

    return reply.code(201).send(product);
  } catch (error) {
    return reply.code(500).send(error);
  }
};
