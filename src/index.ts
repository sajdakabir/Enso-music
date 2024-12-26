import { Elysia } from "elysia";

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL!);

const port = process.env.PORT || 9999;

const app = new Elysia().get("/", () => {
  return {
    message: 'Hello from Enso'
  }
}).listen(port);

console.log(
  `🎵 Enso's server is running at ${app.server?.hostname}:${app.server?.port}`
);
