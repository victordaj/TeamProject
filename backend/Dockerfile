FROM node:10 as builder

WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app

EXPOSE 8000
USER node
CMD ["nodemon", "app.js"]