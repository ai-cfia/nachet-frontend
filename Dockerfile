# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/devcontainers/javascript-node:0-18 AS build
ARG REACT_APP_BACKEND_URL
WORKDIR /nachet-frontend
COPY ./src ./src
COPY ./public ./public
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm install -g npm@9.8.1
RUN npm install --include=dev

FROM node
WORKDIR /nachet-frontend

COPY --from=build /code/build ./build
RUN npm install -g serve

ENTRYPOINT serve -s build