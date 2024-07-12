import { OpenAPIHono } from "@hono/zod-openapi";
import { productService } from "../services";

const apiTags = ["Product"];

export const productRoute = new OpenAPIHono();

productRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all products",
    responses: {
      200: {
        description: "Successfully get all products",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const dataListProduct = await productService.getAll();
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
