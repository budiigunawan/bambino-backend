import { createMiddleware } from "hono/factory";
import { validateToken } from "../libs/jwt";
import { prisma } from "../libs/db";

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

    const decodedToken = await validateToken(token);
    if (!decodedToken) {
      return c.json(
        {
          code: 401,
          status: "error",
          message: "Unauthorized. Token is invalid",
        },
        401
      );
    }

    const userId = decodedToken.subject;
    if (!userId) {
      return c.json(
        {
          code: 401,
          status: "error",
          message: "Unauthorized. User ID doen't exist",
        },
        401
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "User not found",
        },
        404
      );
    }

    c.set("user", user);

    await next();
  });
};
