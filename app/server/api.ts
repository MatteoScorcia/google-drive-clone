import { Hono } from "hono";
import { getLoadContext } from "./context";

const API_BASENAME = "/api";

// Create an API Hono app
const api = new Hono();

api.get("/", async (c) => {
  return c.json({ message: "Hello from the API" });
});

export { api, API_BASENAME };
