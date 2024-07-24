import { OpenAPIHono } from "@hono/zod-openapi";

const apiTags = ["User"];

export const userRoute = new OpenAPIHono();

userRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all users.",
    responses: {
      200: {
        description: "Successfully get all users.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    return c.json(
      {
        code: 200,
        staus: "success",
        data: "users",
      },
      200
    );
  }
);
