import { z } from "zod";
import { LoginSchema, RegisterSchema } from "../schemas/auth-schema";
import { prisma } from "../lib/db";
import { hashPassword } from "../lib/password";

export const create = async (body: z.infer<typeof RegisterSchema>) => {
  try {
    const { username, email, password } = body;
    return await prisma.user.create({
      data: {
        username,
        email,
        password: {
          create: {
            hash: await hashPassword(password),
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getUser = async (body: z.infer<typeof LoginSchema>) => {
  try {
    const { email } = body;
    return await prisma.user.findUnique({
      where: { email },
      include: { password: { select: { hash: true } } },
    });
  } catch (error) {}
};
