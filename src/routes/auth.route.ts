import { Elysia } from "elysia";
import { login } from "../services/auth.service";

const authRoute = new Elysia();


authRoute.get("/login", () => {
    return login();
});


export { authRoute };