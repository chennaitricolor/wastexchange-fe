FROM node:10
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build-dev
CMD ["npm", "start"]
