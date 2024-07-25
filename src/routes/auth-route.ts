import { OpenAPIHono, z } from "@hono/zod-openapi";
import { LoginSchema, RegisterSchema } from "../schemas/auth-schema";
import { authService } from "../services";
import { verifyPassword } from "../lib/password";
import { createToken } from "../lib/jwt";

const apiTags = ["Auth"];

export const authRoute = new OpenAPIHono();

authRoute.openapi(
  {
    method: "post",
    path: "/register",
    request: {
      body: {
        content: {
          "application/json": {
            schema: RegisterSchema,
          },
        },
      },
    },
    description: "Register new user",
    responses: {
      201: {
        description: "Successfully create new user.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const body: z.infer<typeof RegisterSchema> = await c.req.json();
    const newUser = await authService.create(body);

    return c.json(
      {
        code: 201,
        status: "success",
        newUser,
      },
      201
    );
  }
);

authRoute.openapi(
  {
    method: "post",
    path: "/login",
    request: {
      body: {
        content: {
          "application/json": {
            schema: LoginSchema,
          },
        },
      },
    },
    description: "Login user",
    responses: {
      201: {
        description: "Successfully login.",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    const body: z.infer<typeof LoginSchema> = await c.req.json();
    const foundUser = await authService.getUser(body);

    if (!foundUser) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "User not found.",
        },
        404
      );
    }

    if (!foundUser?.password?.hash) {
      return c.json(
        {
          code: 400,
          status: "error",
          message: "User doesn't have a password.",
        },
        400
      );
    }

    const isPasswordValid = await verifyPassword(
      foundUser.password.hash,
      body.password
    );

    if (!isPasswordValid) {
      return c.json(
        {
          code: 400,
          status: "error",
          message: "Password incorrect.",
        },
        400
      );
    }

    const token = await createToken(foundUser.id);

    if (!token) {
      return c.json(
        {
          code: 400,
          status: "error",
          message: "Token failed to create.",
        },
        400
      );
    }

    return c.json(
      {
        code: 201,
        status: "success",
        token,
      },
      201
    );
  }
);
