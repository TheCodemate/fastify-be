import { FastifyReply, FastifyRequest } from "fastify";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { createUser, findUserByEmail, getUsers } from "./user.services";
import { UserInputType, UserLoginInputType } from "./user.schema";

export const registerUserHandler = async (
  request: FastifyRequest<{ Body: UserInputType }>,
  reply: FastifyReply
) => {
  const body = request.body;

  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (error) {
    return reply.code(500).send(error);
  }
};

export const loginUserHandler = async (
  request: FastifyRequest<{ Body: UserLoginInputType }>,
  reply: FastifyReply
) => {
  const body = request.body;
  try {
    const user = await findUserByEmail(body.email);

    if (!user) {
      return reply.code(401).send({
        message: "Invalid email or password",
      });
    }

    const correctPassword = verifyPassword({
      candidatePassword: body.password,
      hash: user.password,
      salt: user.salt,
    });

    if (correctPassword) {
      const { password, salt, ...rest } = user;
      return { accessToken: request.server.jwt.sign(rest) };
    }

    return { status: "hello user" };
  } catch (error) {
    return reply.code(500).send({
      message: "Something went wrong while logging in. Try again later",
    });
  }
};

export const getUsersHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const users = await getUsers();

  console.log("users hehe: ", users);
  try {
    if (!users) {
      return {
        message: "There are no users available",
      };
    }
    return users;
  } catch (error) {
    return reply.code(500).send(error);
  }
};
