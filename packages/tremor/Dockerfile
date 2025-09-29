# --- Build the React SPA ---
FROM node:22-alpine AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/tremor ./packages/tremor
RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/packages/tremor
RUN pnpm build

# --- Serve with nginx ---
FROM nginx:1.29.1-alpine3.22-slim
COPY --from=builder /app/packages/tremor/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
