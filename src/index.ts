import { OpenAPIHono } from "@hono/zod-openapi";
import { productRoute } from "./routes";

const app = new OpenAPIHono();

app.route("/products", productRoute);
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
