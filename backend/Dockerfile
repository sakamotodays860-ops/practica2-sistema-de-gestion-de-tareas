FROM node:18-alpine

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npx prisma generate && node index.js"]
