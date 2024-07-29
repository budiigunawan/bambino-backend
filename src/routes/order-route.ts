import { OpenAPIHono, z } from "@hono/zod-openapi";
import { checkUserToken } from "../middlewares/check-user-token";
import { cartService, orderService } from "../services";
import { CreateOrderSchema } from "../schemas/order-schema";

const apiTags = ["Order"];

export const orderRoute = new OpenAPIHono();

orderRoute.openapi(
  {
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateOrderSchema,
          },
        },
      },
    },
    middleware: [checkUserToken()],
    description: "Create order",
    responses: {
      201: {
        description: "Successfully create order",
      },
      404: {
        description: "Cart is empty",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    // @ts-expect-error: Let's ignore a compile error like this unreachable code
    const user = c.get("user") as { id: string };
    const body: z.infer<typeof CreateOrderSchema> = await c.req.json();

    const existingCart = await cartService.get(user.id);

    if (!existingCart) {
      return c.json(
        {
          code: 404,
          status: "success",
          message: "Cart not found.",
        },
        404
      );
    }

    const cartItems = existingCart.products;

    if (cartItems.length === 0) {
      return c.json(
        {
          code: 404,
          status: "success",
          message: "Cart is empty.",
        },
        404
      );
    }

    const order = await orderService.create(
      user.id,
      existingCart.id,
      cartItems,
      body
    );

    return c.json({
      code: 201,
      status: "success",
      order,
    });
  }
);
