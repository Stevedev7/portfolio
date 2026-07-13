# ---- Build ----
FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable

COPY package.json yarn.lock ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/schemas/package.json ./packages/schemas/package.json
RUN yarn install --frozen-lockfile

COPY apps/web ./apps/web
COPY packages/ui ./packages/ui
COPY packages/schemas ./packages/schemas

RUN yarn workspace @portfolio/schemas build
RUN yarn workspace web build

# ---- Production ----
FROM node:24-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public

EXPOSE 3000
CMD ["node", "apps/web/server.js"]
