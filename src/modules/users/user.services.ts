import { hashPassword } from "../../utils/hash";
import { prisma } from "../../utils/prisma";
import { UserInputType } from "./user.schema";

export const createUser = async (input: UserInputType) => {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);
  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  });

  return user;
};

export const findUserByEmail = async (email: string) => {
  console.log("email: ", email);

  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
};
