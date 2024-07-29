import { OpenAPIHono } from "@hono/zod-openapi";
import { checkUserToken } from "../middlewares/check-user-token";

const apiTags = ["Order"];

export const orderRoute = new OpenAPIHono();

orderRoute.openapi(
  {
    method: "post",
    path: "/",
    middleware: [checkUserToken()],
    description: "Create order",
    responses: {
      201: {
        description: "Successfully create order",
      },
      404: {
        description: "Cart items not found",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    // @ts-expect-error: Let's ignore a compile error like this unreachable code
    const user = c.get("user") as { id: string };

    return c.json({
      code: 201,
      status: "success",
      user,
    });
  }
);
