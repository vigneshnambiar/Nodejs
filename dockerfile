FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV JWT='TestPurpose'

EXPOSE 3000

CMD [ "node","app.js" ]
