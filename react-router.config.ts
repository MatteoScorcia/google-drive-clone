import type { Config } from "@react-router/dev/config";

export default {
  // React Router app entry point
  basename: "/app",
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
} satisfies Config;
