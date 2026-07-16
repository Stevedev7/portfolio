# ---- Build ----
FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable

COPY package.json yarn.lock ./
COPY apps/admin/package.json ./apps/admin/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/schemas/package.json ./packages/schemas/package.json
RUN yarn install --frozen-lockfile

COPY apps/admin ./apps/admin
COPY packages/ui ./packages/ui
COPY packages/schemas ./packages/schemas

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN yarn workspace @portfolio/schemas build
RUN yarn workspace admin build

# ---- Production ----
FROM nginx:alpine AS production
COPY --from=build /app/apps/admin/dist /usr/share/nginx/html
COPY docker/admin/default.conf.template /etc/nginx/templates/default.conf.template

ENV API_UPSTREAM=http://api.portfolio.svc.cluster.local:3001
ENV MINIO_UPSTREAM=http://minio.minio.svc.cluster.local:9000/portfolio

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
