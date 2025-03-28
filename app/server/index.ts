import { Hono } from "hono";
import { createHonoServer } from "react-router-hono-server/bun";
import { api } from "./api";
import { getLoadContext } from "./context";
import { SERVER_ENV } from "./env";

// Create a root Hono app
const app = new Hono();

// Mount the API app at /api
// app.route(SERVER_ENV.API_BASENAME, api);
app.route(SERVER_ENV.API_BASENAME, api);

export default await createHonoServer({
  // Pass the root Hono app to the server.
  // It will be used to mount the React Router app on the `basename` defined in react-router.config.ts
  app,
  getLoadContext,
});
