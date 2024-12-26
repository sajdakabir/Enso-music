import { Elysia } from "elysia";
import { environment } from "./loaders/environment.loader";
import { db } from "./db/drizzle";

const { PORT } = environment();
const app = new Elysia().get("/", () => {
  return {
    message: 'Hello from Enso'
  }
}).listen(PORT);
console.log(
  `🎵 Enso's server is running at ${app.server?.hostname}:${app.server?.port}`
);
