# Stage 1: Build the Angular app
FROM node:22-alpine AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/material ./packages/material
RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/packages/material
RUN pnpm build:production

# Stage 2: Serve with nginx
FROM nginx:1.29.1-alpine3.22-slim
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/packages/material/dist/diagnostics-angular/browser .
COPY --from=builder /app/packages/material/public ./public
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
