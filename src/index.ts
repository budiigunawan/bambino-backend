import { OpenAPIHono } from "@hono/zod-openapi";
import { productRoute } from "./routes";

const app = new OpenAPIHono();
const description =
  "API for Bambino, a simple and user-friendly e-commerce platform built to sell baby clothes.";

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
app.get("/", (c) => {
  return c.json({
    description,
  });
});

export default app;
