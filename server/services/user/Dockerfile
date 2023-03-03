FROM node:18-alpine

ENV NODE_ENV=production

ENV PORT=4001

WORKDIR /chat

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD [ "npm", "start" ]


