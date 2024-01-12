FROM mcr.microsoft.com/devcontainers/javascript-node:0-18 AS build

WORKDIR /nachet-frontend

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install -g npm@9.8.1
RUN npm install --include=dev

COPY . .

ENV PUBLIC_URL=.

# Change this to your backend endpoint
ENV REACT_APP_BACKEND_URL=https://nachet.ninebasetwo.xyz/api

RUN npm run build

FROM node:18

WORKDIR /nachet-frontend

COPY --from=build /nachet-frontend/build ./build

RUN npm install -g serve

EXPOSE 3000

ENTRYPOINT serve -s build
