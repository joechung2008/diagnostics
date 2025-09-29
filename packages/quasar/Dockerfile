# Stage 1: Build the Quasar app
FROM node:22-alpine AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/quasar ./packages/quasar
RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/packages/quasar
RUN pnpm build

# Stage 2: Serve with nginx
FROM nginx:1.29.1-alpine3.22-slim
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/packages/quasar/dist/spa .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
