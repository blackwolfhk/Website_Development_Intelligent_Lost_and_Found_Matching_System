FROM node:lts
WORKDIR /usr/src/app
COPY package.json .
COPY . .
EXPOSE 8080
ENV NODE_ENV production
CMD yarn install && \ 
    yarn knex migrate:latest --env production &&\
    yarn knex seed:run --env production &&\
    yarn start