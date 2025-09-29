# Stage 1: Build the SvelteKit app
FROM node:22-alpine AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/skeleton ./packages/skeleton
RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/packages/skeleton
RUN pnpm build

# Stage 2: Run the SvelteKit SSR server
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/packages/skeleton/build ./build
COPY --from=builder /app/packages/skeleton/package.json ./
COPY --from=builder /app/packages/skeleton/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "build"]
