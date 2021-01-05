FROM node:10 as builder

WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app

EXPOSE 8000
USER node
CMD ["node", "app.js"]