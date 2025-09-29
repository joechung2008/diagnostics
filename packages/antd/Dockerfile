# Stage 1: Build the React app
FROM node:22-alpine AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/antd ./packages/antd
RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/packages/antd
RUN pnpm build

## Stage 2: Serve with nginx
# Use a specific, up-to-date nginx Alpine tag to reduce vulnerability exposure.
FROM nginx:1.29.1-alpine3.22-slim
COPY --from=builder /app/packages/antd/dist /usr/share/nginx/html
COPY --from=builder /app/packages/antd/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
