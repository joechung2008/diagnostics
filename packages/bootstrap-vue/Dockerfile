# Stage 1: Build the Nuxt app
FROM node:22-alpine AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/bootstrap-vue ./packages/bootstrap-vue
RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/packages/bootstrap-vue
RUN pnpm build

# Stage 2: Install only production dependencies and run the Nuxt SSR server
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/packages/bootstrap-vue/.output .output
COPY --from=builder /app/packages/bootstrap-vue/package.json ./
COPY --from=builder /app/packages/bootstrap-vue/node_modules ./node_modules
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
