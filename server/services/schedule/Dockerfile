FROM node:18-alpine

WORKDIR /schedule

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD [ "npm", "start" ]


