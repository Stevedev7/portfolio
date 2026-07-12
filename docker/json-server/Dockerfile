FROM node:24-alpine
WORKDIR /app
RUN corepack enable

COPY apps/json-server/package.json ./
RUN yarn install --production

COPY apps/json-server/db.json.example ./db.json.example
COPY docker/json-server/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

RUN mkdir -p /app/data
VOLUME ["/app/data"]

EXPOSE 3002
ENTRYPOINT ["./entrypoint.sh"]
