FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install -g typescript ts-node 

COPY . .

EXPOSE 5000

CMD ["npm", "start"]