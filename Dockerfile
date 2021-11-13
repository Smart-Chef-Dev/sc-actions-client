# build environment
FROM node:14.16.0-alpine3.12 AS development
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# production environment
FROM ghcr.io/umputun/reproxy:master
COPY --from=development /app/build /www
EXPOSE 8080
ENTRYPOINT ["/srv/reproxy"]
