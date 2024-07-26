import { OpenAPIHono, z } from "@hono/zod-openapi";
import { checkUserToken } from "../middlewares/check-user-token";
import { cartService } from "../services";
import { UpdateCartSchema } from "../schemas/cart-schema";

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

cartRoute.openapi(
  {
    method: "post",
    path: "/items",
    request: {
      body: {
        content: {
          "application/json": {
            schema: UpdateCartSchema,
          },
        },
      },
    },
    middleware: [checkUserToken()],
    description: "Add product to cart",
    responses: {
      201: {
        description: "Successfully add product to cart.",
      },
      404: {
        description: "Cart not found.",
      },
    },
  },
  async (c) => {
    // @ts-expect-error: Let's ignore a compile error like this unreachable code
    const user = c.get("user") as { id: string };
    const body: z.infer<typeof UpdateCartSchema> = await c.req.json();

    const existingCart = await cartService.get(user.id);

    if (!existingCart) {
      return c.json({
        code: 404,
        status: "success",
        message: "Cart not found.",
      });
    }

    const isItemExist = !!existingCart?.products?.find(
      (product) => product?.productId === body.productId
    );

    const updatedCart = await cartService.updateItem(
      existingCart.id,
      isItemExist,
      body
    );

    return c.json({
      code: 200,
      status: "success",
      updatedCart,
    });
  }
);
