FROM node:lts
WORKDIR /usr/app
COPY package*.json ./
COPY dist ./dist
RUN npm install --only=prod
EXPOSE 3000
CMD [ "node", "./dist/server.js" ]
