import Elysia from "elysia";
import { authRoute } from "./auth.route";
import { userRoute } from "./user.route";

export const initRoutes = (app: Elysia) => {
    app.use(authRoute);
    app.use(userRoute);

    app.get('/', () => {
        return {
            message: 'Hello from Enso'
        }
    })

}