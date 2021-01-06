FROM node:10 as builder

WORKDIR /app
COPY package.json /app/package.json

RUN npm install
RUN npm i bcrypt
RUN npm install pm2 -g

COPY . /app

EXPOSE 8000
USER node
CMD ["pm2-runtime", "app.js"]



