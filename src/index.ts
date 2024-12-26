import { Elysia } from "elysia";
import { environment } from "./loaders/environment.loader";
import { db } from "./db/drizzle";
import { users } from "./db/schema";

const { PORT } = environment();

await db.insert(users).values({
  name: 'John Doe',
  email: 'john.doe@example.com'
});

const user = await db.query.users.findFirst();
console.log(user)

const app = new Elysia().get("/", () => {
  return {
    message: 'Hello from Enso'
  }
}).listen(PORT);
console.log(
  `🎵 Enso's server is running at ${app.server?.hostname}:${app.server?.port}`
);
