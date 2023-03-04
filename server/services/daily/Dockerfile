FROM node:18-alpine

WORKDIR /daily

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD [ "npm", "start" ]