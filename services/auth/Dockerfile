FROM node:20-alpine AS node

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY ./src .
COPY ./priv.pem .
COPY ./.env.example ./.env

EXPOSE 3001

ENTRYPOINT ["npm","run","start"]
