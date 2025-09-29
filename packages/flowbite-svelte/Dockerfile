# Stage 1: Build the SvelteKit app
FROM node:22-alpine AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/flowbite-svelte ./packages/flowbite-svelte
RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/packages/flowbite-svelte
RUN pnpm build

# Stage 2: Run the SvelteKit SSR server
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/packages/flowbite-svelte/build ./build
COPY --from=builder /app/packages/flowbite-svelte/package.json ./
COPY --from=builder /app/packages/flowbite-svelte/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "build"]
