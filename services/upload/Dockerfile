FROM node:20-alpine AS node

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY ./src ./pub.pem .

COPY ./.env.example ./.env

EXPOSE 3002

ENTRYPOINT ["npm","run","start"]