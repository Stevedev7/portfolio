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
COPY docker/admin/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
