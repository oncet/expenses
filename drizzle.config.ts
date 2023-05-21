import type { Config } from "drizzle-kit";
 
export default {
  schema: "./app/schemas.ts",
  out: "./drizzle",
} satisfies Config;