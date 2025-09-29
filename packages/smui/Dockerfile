# --- Build the SvelteKit app ---
FROM node:22-alpine AS builder
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/smui ./packages/smui
RUN npm install -g pnpm && pnpm install --frozen-lockfile
WORKDIR /app/packages/smui
RUN pnpm build

# --- Run the SvelteKit SSR server ---
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/packages/smui/build ./build
COPY --from=builder /app/packages/smui/package.json ./
COPY --from=builder /app/packages/smui/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "build"]
