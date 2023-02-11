FROM node:lts-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend-t

WORKDIR /usr/src/app/frontend-t

COPY package*.json .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]