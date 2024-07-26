import { createMiddleware } from "hono/factory";

export const checkUserToken = () => {
  return createMiddleware(async (c, next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      return c.json(
        {
          code: 401,
          status: "error",
          message: "Unauthorized. Authorization header is required",
        },
        401
      );
    }

    // Authorization: ["Bearer", "token"]
    const token = authHeader.split(" ")[1];
    if (!token) {
      return c.json(
        {
          code: 401,
          status: "error",
          message: "Unauthorized. Token is required",
        },
        401
      );
    }

    await next();
  });
};
