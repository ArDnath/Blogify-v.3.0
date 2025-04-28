# Stage 1: Build Frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY ./Blog/package.json ./Blog/yarn.lock ./
RUN yarn install
COPY ./Blog ./
RUN yarn build

# Stage 2: Build Backend
FROM oven/bun:latest AS backend-build
WORKDIR /app/backend
COPY ./backend/package.json ./backend/bun.lockb ./
RUN bun install
COPY ./backend ./

# Stage 3: Final Image
FROM node:18
WORKDIR /app

# Copy built frontend
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Copy backend
COPY --from=backend-build /app/backend ./

# Expose ports
EXPOSE 3000 8080

# Start both frontend and backend
CMD ["sh", "-c", "node ./frontend/dist && bun run dev"]
