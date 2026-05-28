// scripts/dev.ts  (DON'T put under /api on Vercel)
import { app } from '../src/app'
import connectDB from '../src/db/connect'

const port = Number(process.env.PORT ?? 3000)

connectDB()
  .then(() => {
    console.log('Database connected. Starting server...')
    Bun.serve({ fetch: app.fetch, port })
    console.log(`🚀 Server is running on http://localhost:${port}`)
  })
  .catch((err) => {
    console.error('❌ Failed to connect to database:', err)
  })
