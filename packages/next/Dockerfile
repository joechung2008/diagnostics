# Use official Node.js 22 image as base
FROM node:22-alpine AS base

WORKDIR /app
COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/next ./packages/next
RUN npm install -g pnpm
RUN pnpm --filter next install --frozen-lockfile
RUN pnpm --filter next build

WORKDIR /app/packages/next
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "start"]
