FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node ./todo-backend/package.json ./todo-backend/package-lock.json ./

RUN npm ci 

COPY --chown=node:node ./todo-backend .  

ENV DEBUG=playground:*

USER node

CMD ["node", "./bin/www"]