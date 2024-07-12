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

export const CreateProductSchema = z.object({
  name: z.string().min(5).openapi({ example: "T-shirt" }),
  price: z.number().min(1000).openapi({ example: 10000 }),
  stock: z.number().min(0).openapi({ example: 10 }),
  imageUrl: z
    .string()
    .url()
    .openapi({ example: "https://gudegyudjum.com" })
    .optional()
    .or(z.literal("")),
  size: z
    .string()
    .openapi({ example: "New born" })
    .optional()
    .or(z.literal("")),
  slug: z.string().openapi({ example: "t-shirt" }).optional().or(z.literal("")),
  sku: z.string().openapi({ example: "TSNB001" }).optional().or(z.literal("")),
  overview: z
    .string()
    .max(500)
    .openapi({ example: "T-shirt for newborn baby" })
    .optional()
    .or(z.literal("")),
  materials: z
    .string()
    .max(500)
    .openapi({ example: "Cotton" })
    .optional()
    .or(z.literal("")),
});

export const UpdateProductSchema = z.object({
  name: z.string().min(5).openapi({ example: "T-shirt" }),
  price: z.number().min(1000).openapi({ example: 10000 }),
  stock: z.number().min(0).openapi({ example: 10 }),
  imageUrl: z
    .string()
    .url()
    .openapi({ example: "https://gudegyudjum.com" })
    .optional()
    .or(z.literal("")),
  size: z
    .string()
    .openapi({ example: "New born" })
    .optional()
    .or(z.literal("")),
  slug: z.string().openapi({ example: "t-shirt" }).optional().or(z.literal("")),
  sku: z.string().openapi({ example: "TSNB001" }).optional().or(z.literal("")),
  overview: z
    .string()
    .max(500)
    .openapi({ example: "T-shirt for newborn baby" })
    .optional()
    .or(z.literal("")),
  materials: z
    .string()
    .max(500)
    .openapi({ example: "Cotton" })
    .optional()
    .or(z.literal("")),
});
