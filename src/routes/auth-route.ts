import { OpenAPIHono, z } from "@hono/zod-openapi";
import { RegisterSchema } from "../schemas/auth-schema";

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
    console.log(body, "this is body");
    return c.json({
      code: 201,
      status: "success",
      newUser: {},
    });
  }
);
