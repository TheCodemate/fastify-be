import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const ProductCore = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const Product = {
  title: z.string(),
  price: z.number(),
  content: z.string().optional(),
};

const CreateProductSchema = z.object({
  ...Product,
});

const ProductResponseSchema = z.object({
  ...Product,
  ...ProductCore,
});

const ProductsResponseSchema = z.array(ProductResponseSchema);

export type CreateProductType = z.infer<typeof CreateProductSchema>;
export const { schemas: productSchemas, $ref } = buildJsonSchemas(
  {
    CreateProductSchema,
    ProductResponseSchema,
    ProductsResponseSchema,
  },
  { $id: "productSchemas" }
);
