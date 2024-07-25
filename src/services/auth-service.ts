import { z } from "zod";
import { RegisterSchema } from "../schemas/auth-schema";

export const create = async (body: z.infer<typeof RegisterSchema>) => {
  try {
    const { username, email, password } = body;
    return { username, email, password };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
