import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(5).openapi({ example: "jane.doe" }),
  email: z.string().email().openapi({ example: "jane.doe@mail.com" }),
  password: z.string().min(8).openapi({ example: "RainbowCake1234!" }),
  fullName: z.string().min(4).max(50).openapi({ example: "Jane Doe" }),
});

export const LoginSchema = z.object({
  email: z.string().email().openapi({ example: "jane.doe@mail.com" }),
  password: z.string().min(8).openapi({ example: "RainbowCake1234!" }),
});
