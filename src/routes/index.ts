import Elysia from "elysia";
import { authRoute } from "./auth.route";

export const initRoutes = (app: Elysia) => {
    app.use(authRoute);

}
