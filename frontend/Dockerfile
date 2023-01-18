# build environment
FROM node:lts-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn --production --silent
COPY . /app
RUN yarn build

# Copy built React App to Nginx container
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Replace default site config with a custom one
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

