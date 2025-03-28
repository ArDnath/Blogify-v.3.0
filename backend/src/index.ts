import app from "./app";
import connectDB from "./db/connect";


connectDB()
.then(()=>{
  console.log("Database connected.Starting server")

  const port = process.env.Port ;

  Bun.serve({
    fetch: app.fetch,
    port,
  });

  console.log(`🚀 Server is running on http://localhost:${port}`)
})
.catch((err) => {
  console.error("❌ Failed to connect to database:", err);
});