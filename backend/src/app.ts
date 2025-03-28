import { Hono } from "hono";
import { logger } from 'hono/logger'
import { cors } from "hono/cors";
import authRouter  from "./routes/user.route";

const app = new Hono().basePath('/api/v1')

app.use(
  cors({
    origin: process.env.CORS_ORIGIN === "*" ? "*" : process.env.CORS_ORIGIN?.split(",") || [],
    credentials: true,
  })
)

app.use(logger());


app.get('/',(c)=>{
 
  return c.json({"this is working fine": "true"})
  })

app.route('/auth',authRouter);

app.use("*",async(c)=>{
  c.json({
    message: "Router not found"
  },
404);

});

export default app;