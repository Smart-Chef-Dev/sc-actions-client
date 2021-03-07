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
FROM fholzer/nginx-brotli:latest
COPY --from=development /app/build /usr/share/nginx/html
COPY --from=development /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
