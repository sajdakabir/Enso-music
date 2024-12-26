import { Elysia } from "elysia";
import { environment } from "./loaders/environment.loader";
import { initRoutes } from "./routes";


const { PORT } = environment();
const app = new Elysia();

initRoutes(app);

app.listen(PORT, () => console.log(
  `🎵 Enso's server is running at ${app.server?.hostname}:${app.server?.port}`
));

