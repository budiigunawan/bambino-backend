import { OpenAPIHono, z } from "@hono/zod-openapi";
import { productService } from "../services";
import {
  CreateProductSchema,
  ProductIdSchema,
  ProductQueryParameterSchema,
} from "../schemas/product-schema";

const apiTags = ["Product"];

export const productRoute = new OpenAPIHono();

productRoute.openapi(
  {
    method: "get",
    path: "/",
    request: {
      query: ProductQueryParameterSchema,
    },
    description: "Get all products.",
    responses: {
      200: {
        description: "Successfully get all products.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const page = c.req.query("page");
    const limit = c.req.query("limit");
    const q = c.req.query("q");

    const dataListProduct = await productService.getAll(page, limit, q);
    return c.json(
      {
        code: 200,
        status: "success",
        data: dataListProduct,
      },
      200
    );
  }
);

productRoute.openapi(
  {
    method: "get",
    path: "/{id}",
    request: {
      params: ProductIdSchema,
    },
    description: "Get detail product by ID.",
    responses: {
      200: {
        description: "Successfully get detail product by ID.",
      },
      404: {
        description: "Product not found.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const id = c.req.param("id")!;

    const product = await productService.getById(id);

    if (!product) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "Product not found.",
        },
        404
      );
    }

    return c.json(
      {
        code: 200,
        status: "success",
        data: product,
      },
      200
    );
  }
);

productRoute.openapi(
  {
    method: "post",
    path: "/",
    description: "Create new product",
    responses: {
      201: {
        description: "Successfully create new product.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const body: z.infer<typeof CreateProductSchema> = await c.req.json();
    const newProduct = await productService.create(body);

    return c.json(
      {
        code: 201,
        status: "success",
        newProduct,
      },
      201
    );
  }
);
