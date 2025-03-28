import { Hono } from "hono";

const api = new Hono();

api.get("/", async (c) => {
  return c.json({ message: "Hello from the API" });
});

export { api };
