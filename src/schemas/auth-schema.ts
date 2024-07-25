import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(5).openapi({ example: "jane.doe" }),
  email: z.string().email().openapi({ example: "jane.doe@mail.com" }),
  password: z.string().min(8).openapi({ example: "RainbowCake1234!" }),
});
