# ---- Base ----
FROM node:24-alpine AS base
WORKDIR /app
RUN corepack enable

# ---- Dependencies ----
FROM base AS deps
COPY package.json yarn.lock ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/schemas/package.json ./packages/schemas/package.json
RUN yarn install --frozen-lockfile

# ---- Build ----
FROM deps AS build
COPY apps/api ./apps/api
COPY packages/schemas ./packages/schemas
RUN yarn workspace @portfolio/schemas build
RUN yarn workspace api build

# ---- Production ----
FROM base AS production
ENV NODE_ENV=production

COPY package.json yarn.lock ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/schemas/package.json ./packages/schemas/package.json
RUN yarn install --frozen-lockfile --production

COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/openapi.json ./apps/api/openapi.json
COPY --from=build /app/packages/schemas/dist ./packages/schemas/dist

WORKDIR /app/apps/api
EXPOSE 3001
CMD ["node", "dist/index.js"]
