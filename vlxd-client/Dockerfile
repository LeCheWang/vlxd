#build stage
FROM node:20.13.1

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

COPY . .

RUN npm i

CMD npm run build 

# production
FROM nginx:1.23.3
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]