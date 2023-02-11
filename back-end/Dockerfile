FROM node:lts-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY package*.json ./
RUN npm install

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY . .

EXPOSE 8000

CMD npm run migrate:latest && npm run dev