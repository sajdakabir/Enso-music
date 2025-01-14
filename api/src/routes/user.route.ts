import { Elysia } from "elysia";
import { authMiddleware } from "../middleware/auth.middleware";

const userRoute = new Elysia()


userRoute.get("/user", () => {console.log("hey");})

export { userRoute };