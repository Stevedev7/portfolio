# ---- Build ----
FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable

# Default value for NEXT_PUBLIC_MINIO_INTERNAL_URL. Can be overridden at build time: 
ARG NEXT_PUBLIC_MINIO_INTERNAL_URL=http://minio.minio.svc.cluster.local:9000

COPY package.json yarn.lock ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/schemas/package.json ./packages/schemas/package.json
RUN yarn install --frozen-lockfile

COPY apps/web ./apps/web
COPY packages/ui ./packages/ui
COPY packages/schemas ./packages/schemas

# Inject the build-time env var into Next.js build step
ENV NEXT_PUBLIC_MINIO_INTERNAL_URL=$NEXT_PUBLIC_MINIO_INTERNAL_URL

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
