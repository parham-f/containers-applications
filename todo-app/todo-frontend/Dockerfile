FROM node:20

WORKDIR /usr/src/app

COPY ./todo-frontend/package.json ./todo-frontend/package-lock.json ./

RUN npm ci

COPY ./todo-frontend .

ENV VITE_BACKEND_URL="/api/"

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]