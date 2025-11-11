FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL="http://localhost:5000/"

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]