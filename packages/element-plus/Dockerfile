# Stage 1: Build the Nuxt app
FROM node:22-alpine AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/element-plus ./packages/element-plus
RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/packages/element-plus
RUN pnpm build

# Stage 2: Run the Nuxt SSR server
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/packages/element-plus/.output .output
COPY --from=builder /app/packages/element-plus/package.json ./
COPY --from=builder /app/packages/element-plus/node_modules ./node_modules
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
