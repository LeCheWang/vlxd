#build stage
FROM node:20.13.1

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

COPY . .

RUN npm i

CMD npm run build 