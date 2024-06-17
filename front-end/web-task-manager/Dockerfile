FROM node:20 as BUILD_IMAGE

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "preview"]