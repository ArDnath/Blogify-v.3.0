import { Hono } from "hono";
import { getRuntimeKey } from "hono/adapter";
import { cors } from "hono/cors";
import {HTTPException} from "hono/http-exception";
import { registerUser } from "./controllers/User.controller";
import { userRouter } from "./routes/user.route";

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

app.route('/',userRouter);
app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
      c.status(err.status)
      return c.json({
          errors: err.message
      })
 
  } else {
      c.status(500)
      return c.json({
          errors: err.message
      })
  }
})

export default app;