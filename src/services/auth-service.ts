import { z } from "zod";
import { RegisterSchema } from "../schemas/auth-schema";
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
