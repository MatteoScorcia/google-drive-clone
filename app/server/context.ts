import { createGetLoadContext } from "react-router-hono-server/bun";
import { SERVER_ENV, type ServerEnv } from "./env";

/**
 * Declare our loaders and actions context type
 */
declare module "react-router" {
  interface AppLoadContext {
    readonly env: ServerEnv;
  }
}

export const getLoadContext = createGetLoadContext((c, { mode, build }) => {
  return {
    env: SERVER_ENV,
  };
});
