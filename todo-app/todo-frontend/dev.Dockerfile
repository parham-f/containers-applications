FROM node:20-slim
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

ENV VITE_BACKEND_URL="http://localhost:5000/"

RUN npm ci

COPY . .

CMD ["npm", "run", "dev", "--", "--host"]
