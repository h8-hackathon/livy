FROM node:18-alpine

WORKDIR /admin

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD [ "npm", "start" ]


