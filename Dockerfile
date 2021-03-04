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
FROM nginx:stable-alpine
COPY --from=development /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
