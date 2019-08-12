FROM node:10 as builder
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build-dev

FROM nginx:1.17.2
WORKDIR /opt/app
COPY --from=builder /opt/app/dist/wastexchange-fe ./wastexchange-fe
COPY ./nginx.conf.template ./
RUN apt-get update && apt-get install -y wget
ENV DOCKERIZE_VERSION v0.6.1
RUN wget -q https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
ENTRYPOINT ["dockerize", "-template", "/opt/app/nginx.conf.template:/etc/nginx/conf.d/default.conf"]
CMD ["nginx", "-g", "daemon off;"]
