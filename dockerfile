FROM node:23-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]