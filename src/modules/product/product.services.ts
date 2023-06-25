import { prisma } from "../../utils/prisma";
import { CreateProductType } from "./product.schema";

export const getProducts = async () => {
  return await prisma.product.findMany({
    select: {
      title: true,
      price: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      content: true,
    },
  });
};

export const createProduct = async (
  input: CreateProductType & { ownerId: number }
) => {
  const product = await prisma.product.create({
    data: { ...input },
  });

  return product;
};
