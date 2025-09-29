# --- Build the Svelte 4 SPA ---
FROM node:22-alpine AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/svelteui ./packages/svelteui
RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/packages/svelteui
RUN pnpm build

# --- Serve with nginx ---
FROM nginx:1.29.1-alpine3.22-slim
COPY --from=builder /app/packages/svelteui/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
