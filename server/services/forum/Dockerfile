FROM node:18-alpine

ENV NODE_ENV=production

ENV PORT=4003

WORKDIR /forum

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD [ "npm", "start" ]


