import "../env.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schemas";

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

export const db = drizzle(pool, { schema });

export type Db = typeof db;

export type DbTransaction = Parameters<Parameters<Db["transaction"]>[0]>[0];