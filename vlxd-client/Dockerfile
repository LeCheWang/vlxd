#build stage
FROM node:20

WORKDIR /app/vlxd-client

COPY package*.json .

COPY . .

RUN npm i

CMD npm run build

#production
FROM nginx:stable-alpine
COPY --from=build /app/vlxd-client /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]