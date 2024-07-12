import { OpenAPIHono } from "@hono/zod-openapi";

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
    return c.json(
      {
        code: 200,
        status: "success",
        data: {
          text: "all products",
        },
      },
      200
    );
  },
  (result, c) => {
    if (!result.success) {
      return c.json(
        {
          code: 400,
          message: "Error message",
        },
        400
      );
    }
  }
);
