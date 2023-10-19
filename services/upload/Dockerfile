FROM node:20-alpine AS node

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY ./src ./.env ./pub.pem .

EXPOSE 3002

ENTRYPOINT ["npm","run","start"]