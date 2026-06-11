import dotenv from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

// Monorepo root .env — works regardless of process.cwd()
const envPath = path.resolve(dir, "../../../.env");

expand(dotenv.config({ path: envPath }));
