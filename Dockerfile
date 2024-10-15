FROM --platform=linux/amd64 docker.io/nginx:alpine-slim

ARG NODE_ENV="development"

ENV NODE_ENV=$NODE_ENV

COPY /docker/etc/nginx/conf.d/ /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY dist/nandi-foods-web-app/browser/ .

EXPOSE 80