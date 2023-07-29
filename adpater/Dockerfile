FROM node:lts
WORKDIR /usr/app
COPY package*.json ./
COPY dist ./dist
RUN npm install
COPY . .
EXPOSE 3000
