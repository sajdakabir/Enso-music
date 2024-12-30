import { Elysia, t } from "elysia";
import { handleCallback, login } from "../services/auth.service";

const authRoute = new Elysia();


authRoute.get("/login", () => login());
authRoute.get("/callback", ({ query }) => handleCallback(query), { query: t.Object({ code: t.String() }) } );


export { authRoute };
