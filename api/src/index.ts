import { Elysia } from "elysia";
import { environment } from "./loaders/environment.loader";
import { initRoutes } from "./routes";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

const { PORT } = environment();
const app = new Elysia();

app.use(cors());
app.use(swagger());

initRoutes(app);

app.listen(PORT, () => console.log(
  `🦋𝄞⨾𓍢 Enso's server is running at ${app.server?.hostname}:${app.server?.port} 𝄞⨾𓍢ִ໋`
));

