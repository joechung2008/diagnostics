# --- Build the SolidJS SPA ---
FROM node:22-alpine AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/solidjs-suid ./packages/solidjs-suid
RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/packages/solidjs-suid
RUN pnpm build

# --- Serve with nginx ---
FROM nginx:1.29.1-alpine3.22-slim
COPY --from=builder /app/packages/solidjs-suid/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
