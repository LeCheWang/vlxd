#build stage
FROM node:20

WORKDIR /app/vlxd-client

COPY package*.json .

COPY . .

RUN npm i

CMD npm run build 