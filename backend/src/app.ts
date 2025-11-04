// src/app.ts
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import authRouter from './routes/user.route'
import BlogRouter from './routes/Blog.route'

// IMPORTANT: On Vercel your function path is already /api.
// So use '/v1' (NOT '/api/v1') to avoid /api/api/v1 in URLs.
const app = new Hono().basePath('/v1')

app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === '*'
        ? '*'
        : (process.env.CORS_ORIGIN?.split(',') ?? '*'),
    credentials: true,
  })
)

app.use(logger())

app.get('/', (c) => {
  return c.json({ 'this is working fine': 'true' })
})

app.route('/auth', authRouter)
app.route('/post', BlogRouter)

// Proper 404 (your previous use('*', ...) was a middleware mismatch)
app.notFound((c) => c.json({ message: 'Route not found' }, 404))

// Optional: centralized error handler so the function never crashes without a response
app.onError((err, c) => {
  console.error('Hono error:', err)
  return c.json({ message: 'Internal server error' }, 500)
})

export { app }
