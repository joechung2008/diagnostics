# Stage 1: Build the app
FROM node:22-alpine AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/shadcn ./packages/shadcn
RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/packages/shadcn
RUN pnpm build:vite

# Stage 2: Serve with nginx
FROM nginx:1.29.1-alpine3.22-slim
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/packages/shadcn/dist .
COPY --from=builder /app/packages/shadcn/public ./public
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
