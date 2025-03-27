import { Hono } from "hono";
import { getRuntimeKey } from "hono/adapter";

const app = new Hono();


app.get('/',(c)=>{
    if (getRuntimeKey()==="workerd"){
      return c.text("You are on cloudflare ");
    }
    if (getRuntimeKey()==="bun"){
      return c.text("You are on bun");
    }
    return c.text("Unknown runtime");
  })
  
  app.get('/api/hello',(c)=>{
    return c.json({
      ok:true,
      message:"Hello from Ariyaman Hono",
    })
  })
  
  app.get('/posts/:id',(c)=>{
    const page = c.req.query('page');
    const id = c.req.query('id');
    c.header("X-Message","Hi!");
    return c.text(`You want to see ${page} of ${id}`)
  })
  



export default app;