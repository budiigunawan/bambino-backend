import { OpenAPIHono } from "@hono/zod-openapi";
import { productRoute } from "./routes";

const app = new OpenAPIHono();

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
  return c.text("Hello Hono!");
});

export default app;
