import { Hono } from "hono";
import { getRuntimeKey } from "hono/adapter";
import { cors } from "hono/cors";


const app = new Hono();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN === "*" ? "*" : process.env.CORS_ORIGIN?.split(",") || [],
    credentials: true,
  })
)
app.get('/',(c)=>{
    if (getRuntimeKey()==="workerd"){
      return c.text("You are on cloudflare ");
    }
    if (getRuntimeKey()==="bun"){
      return c.text("You are on bun");
    }
    return c.text("Unknown runtime");
  })

export default app;