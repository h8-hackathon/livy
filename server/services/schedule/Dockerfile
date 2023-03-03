FROM node:18-alpine

ENV NODE_ENV=production

ENV PORT=4006

WORKDIR /schedule

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD [ "npm", "start" ]


