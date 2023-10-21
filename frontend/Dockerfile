FROM node:20-alpine as build

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.25.2-alpine

COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]