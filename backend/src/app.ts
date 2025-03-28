import { Hono } from "hono";
import { getRuntimeKey } from "hono/adapter";
import { cors } from "hono/cors";
import { registerUser } from "./controllers/User.controller";

const app = new Hono()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN === "*" ? "*" : process.env.CORS_ORIGIN?.split(",") || [],
    credentials: true,
  })
)


app.get('/',(c)=>{
 
  return c.json({"this is working fine": "true"})
  })

app.post('/register',registerUser)

export default app;