import { z } from "zod";

export const CreateOrderSchema = z.object({
  address: z.coerce.string().min(5).openapi({ example: "Jl Kenangan no 1234" }),
  paymentMethod: z.coerce.string().min(5).openapi({ example: "Bank Transfer" }),
});
