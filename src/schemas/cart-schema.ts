import { z } from "zod";

export const UpdateCartSchema = z.object({
  productId: z.coerce
    .string()
    .min(5)
    .openapi({ example: "clxsclxli0000vs7d0wqe3y8k" }),
  quantity: z.number().min(1),
});
