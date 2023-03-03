FROM node:18-alpine

ENV NODE_ENV=production

ENV PORT=4007

WORKDIR /daily

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD [ "npm", "start" ]