FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node ./todo-backend/ .

RUN npm ci 

ENV DEBUG=playground:*

USER node

CMD ["npm", "run", "dev", "--", "--host"]