FROM node:20-alpine AS node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY index.js .

# Well well well
EXPOSE 3000

ENTRYPOINT ["npm","run","start-prod"]