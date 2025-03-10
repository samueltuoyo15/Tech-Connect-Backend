FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g ts-node typescript
RUN npx tsc --noEmit
EXPOSE 10000
CMD ["npm", "start"]