import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const UserCoreSchema = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  name: z.string(),
};

const UserSchema = z.object({
  ...UserCoreSchema,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

const UserLoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});

const UserLoginResponseSchema = z.object({
  accessToken: z.string(),
});

const UserResponseSchema = z.object({ id: z.number(), ...UserCoreSchema });
export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    UserSchema,
    UserResponseSchema,
    UserLoginSchema,
    UserLoginResponseSchema,
  },
  { $id: "userSchemas" }
);

export type UserInputType = z.infer<typeof UserSchema>;
export type UserLoginInputType = z.infer<typeof UserLoginSchema>;
