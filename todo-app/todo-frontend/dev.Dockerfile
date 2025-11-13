FROM node:20-slim
WORKDIR /usr/src/app

COPY /todo-frontend/package.json /todo-frontend/package-lock.json ./

ENV VITE_BACKEND_URL="http://localhost:5000/"

RUN npm ci

COPY . .

CMD ["npm", "run", "dev", "--", "--host"]
