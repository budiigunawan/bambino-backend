import { OpenAPIHono } from "@hono/zod-openapi";
import { checkUserToken } from "../middlewares/check-user-token";
import { cartService } from "../services";

const apiTags = ["Cart"];

export const cartRoute = new OpenAPIHono();

cartRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get current user's cart",
    middleware: [checkUserToken()],
    responses: {
      200: {
        description: "Successfully get current user's cart.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    // @ts-expect-error: Let's ignore a compile error like this unreachable code
    const user = c.get("user") as { id: string };

    const existingCart = await cartService.get(user.id);

    if (!existingCart) {
      const newCart = await cartService.create(user.id);

      return c.json(
        {
          code: 200,
          status: "success",
          cart: newCart,
        },
        200
      );
    }

    return c.json({
      code: 200,
      status: "success",
      cart: existingCart,
    });
  }
);
