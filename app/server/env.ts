import { z } from "zod";

const serverEnvSchema = z.object({
  APP_VERSION: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, "Version must be in semver format"),
  APP_ENV: z.enum(["development", "staging", "production"]),
  API_BASENAME: z.string().optional().default(""),
  ARGON2_SECRET: z.string().optional().default("secret-key"),
  // DATABASE_URL: z.string().url('Invalid database connection URL'),
  // JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
  // PORT: z.coerce.number().int().min(1024).max(65535).default(3000),
  // LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  // CORS_ORIGINS: z.string().optional().transform(val =>
  //   val ? val.split(',').map(origin => origin.trim()) : []
  // ),
});

const parseServerEnv = () => {
  try {
    const env = process.env;
    const parsedEnv = serverEnvSchema.parse(env);

    return parsedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        "Invalid server environment variables:",
        error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("\n"),
      );

      process.exit(1);
    }

    throw error;
  }
};

export const SERVER_ENV = parseServerEnv();

export type ServerEnv = typeof SERVER_ENV;
