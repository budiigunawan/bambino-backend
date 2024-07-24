import { OpenAPIHono } from "@hono/zod-openapi";
import { userService } from "../services";
import { UserIdSchema, UserQueryParameterSchema } from "../schemas/user-schema";

const apiTags = ["User"];

export const userRoute = new OpenAPIHono();

userRoute.openapi(
  {
    method: "get",
    path: "/",
    request: {
      query: UserQueryParameterSchema,
    },
    description: "Get all users.",
    responses: {
      200: {
        description: "Successfully get all users.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const page = c.req.query("page");
    const limit = c.req.query("limit");
    const q = c.req.query("q");

    const users = await userService.getAll(page, limit, q);
    return c.json(
      {
        code: 200,
        staus: "success",
        data: users,
      },
      200
    );
  }
);

userRoute.openapi(
  {
    method: "get",
    path: "/{id}",
    request: {
      params: UserIdSchema,
    },
    description: "Get detail user by id.",
    responses: {
      200: {
        description: "Successfully get detail user by id.",
      },
      404: {
        description: "User not found.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const id = c.req.param("id")!;

    const user = await userService.getById(id);

    if (!user) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "User not found.",
        },
        404
      );
    }

    return c.json(
      {
        code: 200,
        status: "success",
        data: user,
      },
      200
    );
  }
);
