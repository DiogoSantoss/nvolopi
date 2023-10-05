# Set the base image to node:20-alpine
FROM node:20-alpine as build

# Specify where our app will live in the container
WORKDIR /app

# Copy the React App to the container
COPY . .

# Prepare the container for building React
RUN npm install

# We want the production version
RUN npm run build

# Prepare nginx
FROM nginx:1.25.2-alpine

COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
