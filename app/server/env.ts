import { type } from "arktype";

const serverEnvSchema = type({
  APP_VERSION: "string.semver",
  APP_ENV: "('development' | 'staging' | 'production')",
  "API_BASENAME?": "string",
  ARGON2_SECRET: "string",
  // DATABASE_URL: "string.url",
  // JWT_SECRET: "string > 32",
  // PORT: "string.numeric.parse",
});

const parseServerEnv = () => {
  const env = process.env;
  const parsedEnv = serverEnvSchema(env);

  if (parsedEnv instanceof type.errors) {
    console.error("Invalid server environment variables:", parsedEnv.summary);
    process.exit(1);
  }

  return parsedEnv;
};

export const SERVER_ENV = parseServerEnv();

export type ServerEnv = typeof SERVER_ENV;
