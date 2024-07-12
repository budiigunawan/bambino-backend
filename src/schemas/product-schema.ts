import { z } from "zod";

export const ProductQueryParameterSchema = z.object({
  page: z
    .string()
    .min(1)
    .openapi({ param: { name: "page", in: "query" }, example: "1" })
    .optional(),
  limit: z
    .string()
    .min(1)
    .openapi({ param: { name: "limit", in: "query" }, example: "10" })
    .optional(),
  q: z
    .string()
    .min(1)
    .openapi({ param: { name: "q", in: "query" }, example: "T-shirt" })
    .optional(),
});

export const ProductIdSchema = z.object({
  id: z.coerce
    .string()
    .min(5)
    .openapi({ example: "clxsclxli0000vs7d0wqe3y8k" }),
});
