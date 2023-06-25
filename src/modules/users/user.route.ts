import { FastifyInstance } from "fastify";
import {
  registerUserHandler,
  loginUserHandler,
  getUsersHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

export const userRoutes = async (server: FastifyInstance) => {
  server.post(
    "/",
    {
      schema: {
        body: $ref("UserSchema"),
        response: { 201: $ref("UserResponseSchema") },
      },
    },
    registerUserHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: $ref("UserLoginSchema"),
        response: { 200: $ref("UserLoginResponseSchema") },
      },
    },
    loginUserHandler
  );

  server.get(
    "/",
    {
      preHandler: [server.authenticate],
    },
    getUsersHandler
  );
};
