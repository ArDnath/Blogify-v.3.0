// api/index.ts
import { handle } from 'hono/vercel'
import { app } from './app'
import connectDB from './db/connect'

export const config = { runtime: 'nodejs' } // required for mongoose/Node builtins

// Connect once per serverless instance
let dbReady: Promise<unknown> | null = null
function ensureDB() {
  if (!dbReady) dbReady = connectDB()
  return dbReady
}

// Ensure DB before handling any route
app.use('*', async (_c, next) => {
  await ensureDB()
  return next()
})

export default handle(app)
