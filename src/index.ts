import { OpenAPIHono } from "@hono/zod-openapi";
import { productRoute, userRoute, authRoute } from "./routes";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";

const description =
  "API for Bambino, a simple and user-friendly e-commerce platform built to sell baby clothes.";

const app = new OpenAPIHono();

app.use("/*", cors());

app.onError((err, c) => {
  return c.json(
    {
      code: 500,
      status: "error",
      message: err.message,
    },
    500
  );
});

app.route("/products", productRoute);
app.route("/users", userRoute);
app.route("/auth", authRoute);

app.doc31("/docs", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Bambino API",
    description,
  },
});

app.get("/swagger", swaggerUI({ url: "/docs" }));

app.get("/", (c) => {
  return c.json({
    description,
    swagger: "/swagger",
  });
});

export default app;
